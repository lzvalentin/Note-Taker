const express = require('express')
const path = require('path');
const uuid = require('uuid');
const fs = require('fs')
// const db = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);    
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    var notesArray = JSON.parse(data);
    res.json(notesArray);
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    var arrayOfNoteObjects = JSON.parse(data);
    arrayOfNoteObjects.push(newNote);
    fs.writeFile(
      './db/db.json',
      JSON.stringify(arrayOfNoteObjects),
      'utf-8',
      function (err) {
        if (err) throw err;
        res.json(arrayOfNoteObjects);
      }
    );
  });
});

app.delete('/api/notes/:id', (req, res) => {
  const deletedNote = req.params.id;
  console.log(deletedNote);
  fs.readFile('./db/db.json', 'utf8', function (err, data) {
    if (err) throw err;
    var arrayOfNoteObjects = JSON.parse(data);
    newNoteArray = arrayOfNoteObjects.filter((note) => {
      return note.id !== deletedNote;
    });
    fs.writeFile(
      './db/db.json',
      JSON.stringify(newNoteArray),
      'utf-8',
      function (err) {
        if (err) throw err;
        res.json(newNoteArray);
      }
    );
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);