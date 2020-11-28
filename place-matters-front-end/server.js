const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const port = 5000;
const app_folder = 'dist/place-matters';
const auth = require("../place-matters-server/src/auth.middleware");
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(auth)


// ---- Serve static files ---- //
app.get('*.*', express.static(app_folder, {maxAge: '1y'}));

// ---- Serve application path ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

// ---- Start the Node server  ---- //
app.listen(port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});