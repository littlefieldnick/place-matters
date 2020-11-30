const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const County = sequelize.define("county", {
        countyName: {
            type: DataTypes.STRING
        }
    });

    return County;
}