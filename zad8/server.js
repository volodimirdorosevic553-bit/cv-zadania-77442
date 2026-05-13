// Numer indeksu: 77442
const http = require("http");
const fs = require("fs");

const PORT = 3000;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  response.end(JSON.stringify(data));
}

const server = http.createServer(function (request, response) {
  if (request.method === "OPTIONS") {
    sendJson(response, 200, {});
    return;
  }

  if (request.method === "POST" && request.url === "/messages") {
    let body = "";

    request.on("data", function (chunk) {
      body += chunk.toString();
    });

    request.on("end", function () {
      try {
        const data = JSON.parse(body);

        const message = {
          indexNumber: "77442",
          name: data.name,
          message: data.message,
          createdAt: new Date().toISOString()
        };

        const file = "messages.json";
        let messages = [];

        if (fs.existsSync(file)) {
          messages = JSON.parse(fs.readFileSync(file, "utf8"));
        }

        messages.push(message);
        fs.writeFileSync(file, JSON.stringify(messages, null, 2), "utf8");

        sendJson(response, 200, {
          message: "Dane zapisane w pliku messages.json."
        });
      } catch (error) {
        sendJson(response, 400, {
          message: "Błąd zapisu danych."
        });
      }
    });

    return;
  }

  sendJson(response, 404, {
    message: "Endpoint nie istnieje."
  });
});

server.listen(PORT, function () {
  console.log("Backend 77442 działa na http://localhost:" + PORT);
});
