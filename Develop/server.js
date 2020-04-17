const express = require("express");
const app = express();
const port = process.env.port || 8080;

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log("App listening on PORT: " + port);
});