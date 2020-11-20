const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Resource = sequelize.define("resource", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true
            }
        },

        street: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },

        city: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },

        state: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isIn: [["Maine", "ME"]]
            }
        },

        zip: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isNumeric: {
                    msg: "Please enter a proper zip code. Zip codes should contain only numbers."
                },
                len: 5
            },

        },

        latitude: {
            type: DataTypes.FLOAT,
            validate: {
                min: -90,
                max: 90
            }
        },

        longitude: {
            type: DataTypes.FLOAT,
            validate: {
                min: -180,
                max: 180
            }
        },

        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [0, 500]
            }
        },

        website: {
            type: DataTypes.STRING,
            validate: {
                isUrl: {
                    msg: "Please provide a valid URL for resource."
                }
            }
        },

        phone: {
            type: DataTypes.STRING,
            validate:{
                notEmpty: true,
                is: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
            }
        },

        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: "Please provide a valid email for resource."
                }
            }
        }
    });

    return Resource;
}