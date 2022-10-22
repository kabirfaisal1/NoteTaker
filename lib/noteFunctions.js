const fs = require("fs");
const path = require("path");
const dbjsonPath = '../db/db.json';

//this function is used to create new notes
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, dbjsonPath),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )

    return note;
}
//this function is used to delete notes
function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);
    notesArray.splice(deleteID, 1);

    // This loop re-writes the indexes for the remaining notes.
    for (let i = deleteID; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    }

    fs.writeFileSync(
        path.join(__dirname, dbjsonPath),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    )
}


module.exports = {
    createNewNote,
    deleteNote
};