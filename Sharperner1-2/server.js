const http = require("http");

const server = http.createServer((req, res) => {
  console.log("My name is Parinit Singh!");
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>My First Page</title></head><body><h1>My name is Parinit Singh</h1></body></html>"
  );
  res.end();
});

server.listen(4000);
