const path = require('path');
const router = require('express').Router();
const notesHTML = '../../public/notes.html';
const indexHTML ='../../public/index.html';

//this will allow to interact with notes HTML
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, notesHTML));
});
//this will allow to interact with index HTML
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, indexHTML));
})

module.exports = router;