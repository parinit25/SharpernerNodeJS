const fs = require("fs");
const handler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(`<html>
            <head><title>Enter Message</title></head>
            <body>
                <h2>Previous Message:</h2>
                <p>${getMessage()}</p>
                <form action="/message" method="POST">
                    <input type='text' name='message'/>
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>`);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My First Page</title></head><body><h1>Hello World</h1> <h2>This is working fine !!Hooray!!!!!</h2></body></html>"
  );
  res.end();
};
function getMessage() {
  try {
    const message = fs.readFileSync("message.txt", "utf8");
    return message ? message : "No message found";
  } catch (error) {
    return "Error reading message";
  }
}

exports.handler = handler;
