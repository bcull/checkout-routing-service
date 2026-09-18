"use strict";

const http = require("node:http");
const { selectRoute } = require("./routing");

const port = Number(process.env.PORT || 3000);

const server = http.createServer((request, response) => {
  if (request.method !== "POST" || request.url !== "/routes") {
    response.writeHead(404).end();
    return;
  }

  let body = "";
  request.setEncoding("utf8");
  request.on("data", (chunk) => {
    body += chunk;
  });
  request.on("end", () => {
    try {
      const result = selectRoute(JSON.parse(body));
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(result));
    } catch (error) {
      response.writeHead(400, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(port, () => {
  process.stdout.write(`checkout routing service listening on ${port}\n`);
});
