const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const md5 = require("md5");
const {Client} = require("@googlemaps/google-maps-services-js");
const port = 4100;
const app_folder = 'dist/place-matters';

const app = express();

app.use(cors())
app.use(bodyParser.json());

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(app_folder, {maxAge: '1y'}));

// ---- SERVE APPLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: app_folder});
});

// ---- START UP THE NODE SERVER  ---- //
app.listen(port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + port);
});