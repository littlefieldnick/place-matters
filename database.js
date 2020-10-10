const sqlite3 = require("sqlite3").verbose();
const DBSOURCE = "./instance/place_matters_dev.db";


let db = new sqlite3.Database(DBSOURCE, (err) => {
    if(err){
        console.error(err.message);
        throw err;
    } else {
        console.log("Successfully connected to the database.");
    }
});

module.exports = db