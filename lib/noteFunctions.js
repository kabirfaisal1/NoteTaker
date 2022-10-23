const fs = require("fs");
const path = require("path");

//create New Note function
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    
    WriteFileSync(notesArray);
    

    return note;
}
//edit note function
function editNote(notesArray, id) {
    let editID = parseInt(id);
    notesArray.splice(editID, 1);
    notesArray.push(note);
    WriteFileSync(notesArray);
    return note;

   
}
//delete note function
function deleteNote(notesArray, id) {
    let deleteID = parseInt(id);
    notesArray.splice(deleteID, 1);

    // This loop re-writes the indexes for the remaining notes.
    for (let i = deleteID; i < notesArray.length; i++) {
        notesArray[i].id = i.toString();
    }
    WriteFileSync(notesArray);
}

//global fs.writeFileSync function
function WriteFileSync(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: notesArray
        }, null, 2)
    );
}

module.exports = {
    createNewNote,
    deleteNote,
    editNote
};