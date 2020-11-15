const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },

        password: {
            type: DataTypes.STRING
        },
        confirmPassword: {
            type: DataTypes.STRING
        },
    });

    return User;
}