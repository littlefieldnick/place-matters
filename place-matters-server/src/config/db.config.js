module.exports = {
    host: "localhost",
    port: 3306,
    user: "littlefield", // Replace with mysql db username
    password: "Those321!", //Replace with mysql db password
    db: "placematters",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}