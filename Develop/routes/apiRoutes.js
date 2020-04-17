const notes = require("../db/db.json");
// const path = require("path");
const fs = require("fs");
const rawData = fs.readFileSync("db/db.json");
var notesArr = JSON.parse(rawData);

const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

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
            notesArr = [];
        }
        notesArr.push(req.body);
        setNoteID();

        var notesData = JSON.stringify(notesArr, null, 4);

        await addToSavedNotes(notesData);

        res.json(req.body);
    });
}

function setNoteID() {
    notesArr.forEach((el, index) => {
        el.id = index + 1
    });
}

async function addToSavedNotes(content) {
    writeFileAsync("db/db.json", content);
}