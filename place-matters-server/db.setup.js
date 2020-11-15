const mysql = require("mysql2/promise")
const fs = require("fs")
let dbConfig;

if (process.env.mode === "development")
    dbConfig = require("./src/config/db.config.js");
else
    dbConfig = process.env.dbConfig;

async function buildDb() {
    const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password
    });

    await connection.query('DROP DATABASE IF EXISTS placematters;');
    await connection.query('CREATE DATABASE IF NOT EXISTS placematters;');

    connection.close();
    const sequelize = require("./src/database");

    await sequelize.sync();

    return sequelize;

}


buildDb().then(async (sequelize) => {
    let catData =  fs.readFileSync("./src/config/predefinedData/categories.data.json")
    let ctyData =  fs.readFileSync("./src/config/predefinedData/countyNames.data.json");

    await sequelize.models.county.bulkCreate(JSON.parse(ctyData.toString()));
    await sequelize.models.category.bulkCreate(JSON.parse(catData.toString()));
    await sequelize.close();
})

