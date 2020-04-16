const express = require("express");

const app = express();
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const port = process.env.port || 8080;

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.listen(port, function() {
    console.log("App listening on PORT: " + port);
});