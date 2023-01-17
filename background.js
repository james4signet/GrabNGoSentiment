const {google} = require('googleapis');
const language = google.language({version: 'v1'});

// authenticate the API client
function authenticate() {
    const credentials = require('./credentials.json');
    const client = new language.LanguageServiceClient({credentials});
    return client;
}

// create context menu item
chrome.contextMenus.create({
    title: "Capture Selected Text",
    contexts:["selection"],
    onclick: function(info, tab) {
        chrome.tabs.executeScript(tab.id, {file: "extract-text.js"});
    }
});

// listen for messages from content script
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.text) {
            // store the selected text in the browser's local storage
            localStorage.setItem("selectedText", request.text);
            
            // authenticate the API client
            const client = authenticate();
            
            // call the Google Cloud API with the selected text
            const request = {
                document: {
                  type: 'PLAIN_TEXT',
                  content: request.text,
                },
                features: {
                  extractEntities: true,
                  extractDocumentSentiment: true,
                },
                encodingType: 'UTF8',
              };
              client
                .analyzeSentiment({request})
                .then(responses => {
                  const sentiment = responses[0].documentSentiment;
                  console.log(`Document sentiment:`);
                  console.log(`  Score: ${sentiment.score}`);
                  console.log(`  Magnitude: ${sentiment.magnitude}`);
                  chrome.storage.local.set({result: sentiment});
                })
                .catch(err => {
                  console.error(err);
                });
        }
    }
);
