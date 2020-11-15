const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Permission = sequelize.define("permission", {
        name: {
            type: DataTypes.STRING
        }
    });

    return Permission;
}