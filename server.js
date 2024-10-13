const http = require("http");
const url = require("url");
import MESSAGES from "./lang/messages/en/user.js";
const Dictionary = require("./modules/dictionary");

const PORT = 3004;
const dictionary = new Dictionary();
let totalRequests = 0;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  res.setHeader("Content-Type", "application.JSON");
  res.setHeader("Access-control-Allow-Origin", "*");

  if ((pathname = "/add/definitions" && req.method == "GET")) {
    const word = query.word;

    if (!word) {
      res.writeHead(400);
      res.end(JSON.stringify({ message: MESSAGES.noWord }));
      return;
    }

    const definition = dictionary.retrieveDefinition(word);

    if (definition) {
      res.writeHead(200);
      res.end(
        JSON.stringify({
          requestNumber: totalRequests,
          wordCound: dictionary.getWordCount(),
          word: word,
          definition: definition,
        })
      );
    } else {
      res.writeHead(404);
      res.end(
        JSON.stringify({
          requestNumber: totalRequests,
          wordCound: dictionary.getWordCount(),
          word: word,
          message: MESSAGES.wordNotFound.replace("%WORD%", word),
        })
      );
    }

    // adding a word to the dictionary
  } else if ((pathname = "/api/definitions" && req.method == "POST")) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        const word = data.word;
        const definition = data.definition;

        if (
          !word ||
          !definition ||
          typeof word !== "string" ||
          typeof definition !== "string"
        ) {
          res.writeHead(400);
          res.end(JSON.stringify({ message: MESSAGES.invalidInput }));
          return;
        }

        const result = dictionary.addWord(word, definition);

        if (result.success) {
          res.writeHead(201);
          res.end(
            JSON.stringify({
              requestNumber: totalRequests,
              message: MESSAGES.newEntry,
              totalEntries: dictionary.getTotalEntries(),
            })
          );
        } else {
          res.writeHead(400);
          res.end(
            JSON.stringify({
              requestNumber: totalRequests,
              message: MESSAGES.alreadyExists.replace("%WORD%", word),
              totalEntries: dictionary.getTotalEntries(),
            })
          );
        }
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: MESSAGES.invalidJSON }));
      }
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: MESSAGES.routeNotFound }));
  }
});

server.listen(PORT);
