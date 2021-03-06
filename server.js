const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const noteData = require("./db/db.json");
const app = express();
const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// GET /notes` should return the `notes.html` file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  console.log(noteData);
  res.json(noteData);
});

// * `GET *` should return the `index.html` file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file,
// and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved
// (look into npm packages that could do this for you).
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uniqid();
  noteData.push(newNote);
  console.log(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
    console.log("Saved!");
  });
  location.reload();
});

// `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete.
// To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the
// given `id` property, and then rewrite the notes to the `db.json` file.

app.delete("/api/notes/:id", (req, res) => {
  console.log(req.params.id);
  // const notesArr = JSON.parse(noteData);
  console.log(noteData[0].id);
  console.log(
    noteData.findIndex((note) => {
      note.id == req.params.id;
    })
  );
});
