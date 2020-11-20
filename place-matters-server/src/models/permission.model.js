const {DataTypes} = require('sequelize')


module.exports = (sequelize) => {
    const Permission = sequelize.define("permission", {
        name: {
            type: DataTypes.STRING,
            notNull: true,
            isAlphanumeric: true,
            unique: true
        },

        description: {
            type: DataTypes.STRING,
            notNull: false,
            validate: {
                max: 500
            }
        }
    });

    return Permission;
}