const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/home") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>Welcome Home</title></head><body><h1>Welcome home</h1></body></html>"
    );
    res.end();
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>About Us</title></head><body><h1>About Us</h1></body></html>"
    );
    res.end();
  } else if (req.url === "/node") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>Node.js Project</title></head><body><h1>Welcome to my Node.js project</h1></body></html>"
    );
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write(
      "<html><head><title>404 Not Found</title></head><body><h1>404 Not Found</h1></body></html>"
    );
    res.end();
  }
});

server.listen(3000);
