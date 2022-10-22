const databasePath = '../../db/db.json';
const noteFunctions = '../../lib/noteFunctions';

//this is to route through express 
const router = require("express").Router();
const {
    notes 
} = require('../../db/db.json');
const {
    createNewNote,
    deleteNote
} = require('../../lib/noteFunctions');


router.get('/notes', (req, res) => {
    let saved = notes;
    res.json(saved);
})

//route will use this to post notes. http://localhost:3001/notes
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    let note = createNewNote(req.body, notes);
    res.json(note);
})
//route will use this to delete notes by ID number. http://localhost:3001/notes/:id#
router.delete('/notes/:id', (req, res) => {
    deleteNote(notes, req.params.id);
    res.json(notes);
})


module.exports = router;