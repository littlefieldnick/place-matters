const mysql = require("mysql2/promise")
const fs = require("fs")
const Permission = require("./src/models/permission.model");
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
    const db = await require("./src/database");

    await db.sync();
    return db;

}

buildDb().then(async (db) => {
    let catData = fs.readFileSync("./src/config/predefinedData/categories.data.json");
    let ctyData = fs.readFileSync("./src/config/predefinedData/countyNames.data.json");
    let permData = fs.readFileSync("./src/config/predefinedData/permissions.data.json");
    let roleData = fs.readFileSync("./src/config/predefinedData/roles.data.json");

    const {category, county, resource, user, role, permission} = db.models
    await county.bulkCreate(JSON.parse(ctyData.toString()));
    await category.bulkCreate(JSON.parse(catData.toString()));
    await permission.bulkCreate(JSON.parse(permData.toString()));

    const transaction = await db.transaction();
    for (let rec of JSON.parse(roleData.toString())) {
        let roleCreated = await role.create(rec, {transaction})

        // Add associated permissions to roles. If the provided role does not exist, it is created.
        for (let perm of rec.permissions) {
            if (perm.id) {
                let p = await permission.findAll({
                    where: {
                        id: perm.id
                    }
                }, {transaction})

                await roleCreated.addPermission(p, {transaction});
            } else {
                let pCreated = await permission.create(perm, {transaction});
                await roleCreated.addPermission(pCreated, {transaction});
            }
        }
    }

    try {
        transaction.commit().catch(err => console.log(err))
    } catch (err) {

    }

    //Check for default ADMIN
    const result = await role.findOne({
        where: {name: "ADMIN"},
        include: [
            {
                model: permission
            }
        ]
    });

    console.log(result.toJSON());
    await db.close();
})

