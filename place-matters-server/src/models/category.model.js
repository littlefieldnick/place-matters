const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Category = sequelize.define("category", {
        categoryName: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    });


    return Category;
}