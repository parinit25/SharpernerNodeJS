const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment");

router.get("/messages", (req, res, next) => {
  const filePath = path.join(__dirname, "../chat.txt");
  const data = fs.readFileSync(filePath, { encoding: "utf8", flag: "r" });

  // Split the data into lines and format each line
  const formattedMessages = data.split("\n").map(line => {
    const parts = line.split(": ");
    if (parts.length === 2) {
      const username = parts[0];
      const messageAndTime = parts[1].split(" sent at ");
      const message = messageAndTime[0];
      const time = messageAndTime[1];
      return `${username}: ${message} sent at ${time}`;
    }
    return line;
  }).join("<br>");

  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat Page</title>
    </head>
    <body>
        <div style="display: flex;">
            <div style="width: 50%; padding: 20px;">
                <h3>Enter the message to send</h3>
                <form action='/chat/messages' method="POST" id="messageForm">
                    <label for="message">Message</label>
                    <input type="text" name="message" id="message" required> 
                    <input type="hidden" name="username" id="hiddenUsername" value="TestUser">
                    <br>
                    <br>
                    <button type="submit">Send</button>
                </form>
            </div>
            <div style="width: 50%; padding: 20px; border-left: 1px solid #ccc;">
                <h3>Previous Messages</h3>
                <p>${formattedMessages}</p>
            </div>
        </div>
        <script>
            document.getElementById("messageForm").addEventListener("submit", function(event) {
                event.preventDefault();
                const username = localStorage.getItem('username');
                document.getElementById('hiddenUsername').value = username;
                this.submit();
            });
        </script>
    </body>
    </html>
  `);
});

router.post("/messages", (req, res, next) => {
  const message = req.body.message;
  const username = req.body.username;
  const dateTime = moment().format("DD-MM-YYYY hh:mm A");

  // Construct the message to be appended to the file
  const formattedMessage = `${username}: ${message} sent at ${dateTime}\n`;

  const filePath = path.join(__dirname, "../chat.txt");
  fs.appendFile(filePath, formattedMessage, (err) => {
    if (err) {
      console.error("Error appending message to chat file:", err);
      res.redirect("/chat/messages");
    } else {
      res.redirect("/chat/messages");
    }
  });
});


// router.get("/messages", (req, res, next) => {

// });

module.exports = router;
