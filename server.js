const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");
const app = express();
const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// HTML Routes

// GET /notes` should return the `notes.html` file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Get * makes it not work
// Is it because the index.js is making a get request to a path which is redirected by this?
// * `GET *` should return the `index.html` file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API Routes

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  console.log(noteData);
  res.sendFile(noteData);
});
