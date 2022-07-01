const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

// GET / should return homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// GET /notes` should return the `notes.html` file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
