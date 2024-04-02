const http = require("http"); // Change from "https" to "http"

const handler = (req, res) => {
  const url = req.url;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>My First Page</title></head><body><h1>Hello World</h1></body></html>"
    );
    res.end();
  }
};
const server = http.createServer(handler);

server.listen(4000);
