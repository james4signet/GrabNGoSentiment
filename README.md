# GrabNGoSentiment
Widget to perform on-the-fly sentiment and keyword analysis

# Description:

Grabngo is a Chrome-based widget that performs instant but basic sentiment analysis when then the user right-clicks on the selected text, the text that is selected is cached and sent to the API like Google Cloud Natural Language Processing which processes the text for keywords, sentiment and assigns the text a subcategory, it returns the result by creating a local html page with the results in table format where the browser will automatically open a new tab or window to display to the user.


# Notes

/It is important to note that you need to have a valid API key from Google Cloud Platform to make API calls. Also, you need to have the @google-cloud/language package installed, you can install it by running 

```npm install @google-cloud/language``` in your terminal.

* You can use localStorage.setItem("selectedText", request.text) to store the selected text in the browser's local storage.

* The background.js file runs in the background and is responsible for handling events and messages from the content scripts, browser action, and context menu. This file also has access to the chrome.storage and chrome.contextMenus APIs, which allow you to store and retrieve data from the browser's local storage, and create context menu items.

* You need to authenticate the client to be able to call the API, the analyzeSentiment is a function that call the Google Cloud API, this function takes as an input a request object that contains the text to be analyzed and the features that you want to extract from the text.

* If you were to do any server-side processing, you would need a **serverside.js** file that would handle that logic. For example, if you needed to send the selected text to a server and have that server process the text and return the result, then you would need a serverside.js file that makes the request to the server and handles the response. But as mentioned earlier, in the case I've described all the logic is handled by the browser.

# Dependencies

1. content script, browser action, and context menu, it also contains the code for storing the selected text in the browser's local storage and sending it to the Google Cloud API.
2. The manifest file is a JSON file that contains the meta information of your extension, such as the name, description, version, and permissions of your extension.
3. extract-text.js: This file contains the code for capturing the selected text from the web page and sending it to the background.js file, it also contains the code for retrieving the result from the Google Cloud API and displaying it to the user.
4. credentialsSample.json: This file contains the credentials for authenticating the API client with the Google Cloud API. This is only a sample, you need to get the file from Google
