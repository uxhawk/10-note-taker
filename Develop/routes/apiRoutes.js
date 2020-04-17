const notes = require("../db/db.json");
// const path = require("path");
// const fs = require("fs");

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        return (res.json(notes));
    });



    app.post("/api/notes", function(req, res) {
        notes.push(req.body);
        setNoteID();
        console.log(`added to notes`);
    });

}

function setNoteID() {
    notes.forEach((el, index) => {
        el.id = index
    });
}