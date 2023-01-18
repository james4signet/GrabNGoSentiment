const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/process-text", (req, res) => {
    // process the text
    let processedText = processText(req.body.text);

    // make the request to the Google Cloud API
    request.post({
        url: "https://language.googleapis.com/v1/documents:analyzeSentiment",
        json: {
            "document": {
                "type": "PLAIN_TEXT",
                "content": processedText
            },
            "encodingType": "UTF8"
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    }, (err, response, body) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(body);
            res.send(body);
        }
    });
});

function processText(text) {
    // your text processing logic here
    // ...

    return processedText;
}

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
