const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const fs = require("fs");
const db = require("./db/db.json");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/notes.html"));
});
app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    console.log(data);
    res.json(data);
  });
});
app.post("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    const notes = JSON.parse(data);
    console.log(req.body);
    notes.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) console.log(err);
      res.json(req.body);
    });
  });
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.listen(PORT);
// apend to page
