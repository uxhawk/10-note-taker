var notes = require("../db/db.json");
const fs = require("fs");
const rawData = fs.readFileSync("db/db.json");
var notesArr = JSON.parse(rawData);

const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

//checks if db.json has any saved notes
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        return (res.json(notes));
    });

    app.get("/api/notes/:id", function(req, res) {
        let id = req.params.id;
        return res.json(notes[id - 1]);
    });

    app.post("/api/notes", async function(req, res) {
        //if you don't have any saved notes, reset the notes array to be empty
        if (isEmpty(notes)) {
            notes = [];
        }

        notes.push(req.body);
        //run function to set unique ids to each element in the array
        setNoteID();

        //stringify notes array, then write it to the db.json file
        let notesData = JSON.stringify(notes, null, 4);
        await setSavedNotes(notesData);

        res.json(req.body);
    });

    app.delete("api/notes/:id", async function(req, res) {
        let id = req.params.id;

        deleteNote(id);
        setNoteID();

        let notesData = JSON.stringify(notes, null, 4);
        await setSavedNotes(notesData);
        res.json(req.body);
    });
}

function setNoteID() {
    notes.forEach((el, index) => {
        el.id = index + 1
    });
}

function setSavedNotes(content) {
    try {
        return writeFileAsync("db/db.json", content);
    } catch (err) {
        console.log(err);
    }
}

function deleteNote(noteID) {
    // console.log(notes);
    notes.forEach((el, index) => {
        if (el.id === noteID) {
            notes.splice(index, 1);
        }
    });
}