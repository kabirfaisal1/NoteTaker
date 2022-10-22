const fs = require("fs");
const path = require("path");
const dbjsonPath = './assets/db/db.json'

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