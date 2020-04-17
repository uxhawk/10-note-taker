const express = require("express");
const path = require("path");
const fs = require("fs");

const notes = require("./db/db.json");

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

const port = process.env.port || 8080;

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.listen(port, function() {
    console.log("App listening on PORT: " + port);
});

// Basic route that sends the user first to the Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Route to read all the contents from the notes db
// * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON

app.get("/api/notes", function(req, res) {
    return (res.json(notes));
});

// app.post("/api/tables", function(req, res) {
//     // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
//     // It will do this by sending out the value "true" have a table
//     // req.body is available since we're using the body parsing middleware
//     if (tableData.length < 5) {
//       tableData.push(req.body);
//       res.json(true);
//     }
//     else {
//       waitListData.push(req.body);
//       res.json(false);
//     }
//   });