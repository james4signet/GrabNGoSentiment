// get the result from the browser's local storage an display the page


chrome.storage.local.get("result", function(data) {
    // create a new HTML page
    const page = `
        <html>
            <head>
                <title>Sentiment Analysis Results</title>
            </head>
            <body>
                <table>
                    <tr>
                        <th>Score</th>
                        <th>Magnitude</th>
                    </tr>
                    <tr>
                        <td>${data.result.score}</td>
                        <td>${data.result.magnitude}</td>
                    </tr>
                </table>
            </body>
        </html>
    `;

    // create a new tab to display the page
    chrome.tabs.create({
        url: "data:text/html," + page,
        active: true
    });
});
