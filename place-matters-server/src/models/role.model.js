const {DataTypes} = require('sequelize')
module.exports = (sequelize) => {
    const Role = sequelize.define("role", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 3,
                max: 32,
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                min: 5,
                max: 500
            }
        }
    });
    return Role;
}