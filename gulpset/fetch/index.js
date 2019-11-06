const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; // If modifying these scopes, delete token.json.
const DATA_TYPE = process.argv[2];
const SCRIPT_ID = 'MDHz1rZ0gTMOX1PZE1uQuWRSypaL3G7Ii';
const TOKEN_PATH = __dirname + '/token.json'; // The file token.json stores the user's access and refresh tokens, and is created automatically when the authorization flow completes for the first time.
const CLIENT_SECRET_PATH = __dirname + '/client_secret.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
const getAccessToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter the code from that page here: ', code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

/**
 * Creates a new script project, upload a file, and log the script's URL.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const callScript = (auth, script, dataType) => {
  const isForEjs = dataType === 'tdk';
  const dataPath = (isForEjs) ? __dirname + '/../tasks/ejs/_' + dataType + '.js' : __dirname + '/../../src/assets/js/data/' + dataType + '.json';

  // Make the API request. The request object is included here as 'resource'.
  script.scripts.run(
    {
      auth: auth,
      resource: {
        function: 'doOutput',
        parameters: [dataType]
      },
      scriptId: SCRIPT_ID
    },
    function(err, res) {
      if (err) {
        //The API encountered a problem before the script started executing.
        console.log('The API returned an error: ' + err);
        return;
      }
      if (res.error) {
        // The API executed, but the script returned an error.

        // Extract the first (and only) set of error details. The values of this
        // object are the script's 'errorMessage' and 'errorType', and an array
        // of stack trace elements.
        const error = res.error.details[0];
        console.log('Script error message: ' + error.errorMessage);
        console.log('Script error stacktrace:');

        if (error.scriptStackTraceElements) {
          // There may not be a stacktrace if the script didn't start executing.
          for (let i = 0; i < error.scriptStackTraceElements.length; i++) {
            const trace = error.scriptStackTraceElements[i];
            console.log('\t%s: %s', trace.function, trace.lineNumber);
          }
        }
      } else {
        const folderSet = res.data.response.result;
        const outputSource = (isForEjs) ? `module.exports = ${folderSet};` : folderSet;
        fs.writeFile(dataPath, outputSource, err => {
          if (err) console.error(err);
          else console.log(dataType + 'データのダウンロードが完了しました。');
        });
      }
    }
  );
};
const callAppsScript = auth => {
  const script = google.script({ version: 'v1', auth });

  if (DATA_TYPE) {
    callScript(auth, script, DATA_TYPE);
  } else {
    callScript(auth, script, 'tdk');
    callScript(auth, script, 'bnr');
    callScript(auth, script, 'yutai');
  }
};

// Load client secrets from a local file.
fs.readFile(CLIENT_SECRET_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  else return authorize(JSON.parse(content), callAppsScript); // Authorize a client with credentials, then call the Google Apps Script API.
});
