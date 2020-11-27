const Sequelize = require("sequelize");
const {applyAssociations} = require("./models/model.associations")
let dbConfig;

if (process.env.mode === "development")
    dbConfig = require("./config/db.config.js");
else
    dbConfig = process.env.dbConfig;

console.log(dbConfig);
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const modelDefiners = [
    require("./models/category.model"),
    require("./models/county.model"),
    require("./models/resource.model"),
    require("./models/permission.model"),
    require("./models/role.model"),
    require("./models/user.model")
];

for(const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}

applyAssociations(sequelize)

module.exports = sequelize