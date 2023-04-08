// dependencies
const express = require("express");
const router = express.Router();
// creates a random id
const uuid = require("uuid").v4;
// brings in the DB class object
const DB = require("../db/DB");

// route to get notes
router.get("/api/notes", async function (req, res) {
  const notes = await DB.readNotes();
  return res.json(notes);
});

// route to add a new note and add it to the json file
router.post("/api/notes", async function (req, res) {
  const currentNotes = await DB.readNotes();
  console.log(req.body)

  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await DB.addNote([...currentNotes, newNote]);

  return res.send(newNote);
});

// // route to delete notes
router.delete("/api/notes/:id", async function (req, res) {
  // separates out the note to delete based on id
  const noteToDelete = req.params.id;
  // notes already in json file
  const currentNotes = await DB.readNotes();
  // sort through notes file and create a new array minus the note in question
  const deleteNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

  // sends the new array back the DB class 
  await DB.deleteNote(deleteNoteData);
  
  return res.send(deleteNoteData);
});


///NEW
router.put("/api/notes/:id", async function (req, res) {
  // separates out the note to EDIT based on id
  const noteToEdit = req.params.id;
  const currentNotes = await DB.readNotes();
  //let editNoteData = currentNotes.filter((note) => note.id == noteToEdit);
    // console.log("LINE 75", editNoteData)
    let editNoteData =  [{
      id: noteToEdit,
      title: req.body.title,
      text: req.body.text,
    }];
    let existingDataArr = Array.from(currentNotes);
    let argReq = new Map(editNoteData.map(e => [e.id, e]));
    console.log("LINE 67", argReq)
    let updateArr= existingDataArr.map(obj => argReq.has(obj.id) ? argReq.get(obj.id) : obj);
    console.log("line 70", updateArr)
    await DB.editNote(updateArr);
    // await DB.addNote([...currentNotes, editNoteData]);
     return res.send(editNoteData);
});


module.exports = router;