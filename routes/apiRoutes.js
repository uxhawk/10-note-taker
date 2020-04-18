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
        var id = req.params.id;
        return res.json(notes[id]);
    });

    app.post("/api/notes", async function(req, res) {
        if (isEmpty(notes)) {
            notes = [];
        }
        notes.push(req.body);
        setNoteID();

        var notesData = JSON.stringify(notes, null, 4);

        await addToSavedNotes(notesData);

        res.json(req.body);
    });
}

function setNoteID() {
    notes.forEach((el, index) => {
        el.id = index + 1
    });
}

function addToSavedNotes(content) {
    try {
        return writeFileAsync("db/db.json", content);
    } catch (err) {
        console.log(err);
    }
}