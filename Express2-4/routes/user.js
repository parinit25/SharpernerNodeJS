const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res, next) => {
  res.status(200).send(
    `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Log-In Page</title>
    </head>
    <body>
        <h3>Enter the username to login</h3>
        <form id="loginForm" method="POST">
            <label for="username">Enter username</label>
            <input type="text" name="username" id="username" required> 
            <br>
            <br>
            <button type="submit">log In</button>
        </form>
        <script>
            document.getElementById("loginForm").addEventListener("submit", function(event) {
                event.preventDefault();
                localStorage.setItem('username', document.getElementById('username').value);
                this.submit();
            });
        </script>
    </body>
    </html>`
  );
});
router.post("/", (req, res, next) => {
  res.redirect("/chat/messages");
});

module.exports = router;
