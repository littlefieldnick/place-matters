const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 2,
                max: 32
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                max: 500
            }
        }
    });

    return Category;
}