const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const port = 5000;
const app = express();

app.use(cors())
app.use(bodyParser.json());

//Define API Routes
app.use("/api/counties", require("./routes/county.route"));
app.use("/api/resources", require("./routes/resource.route"));

// ---- Start the Node server  ---- //
app.listen(port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});