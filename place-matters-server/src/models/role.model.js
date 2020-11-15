const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Role = sequelize.define("role", {
        name: {
            type: DataTypes.STRING
        },
    });
    return Role;
}