const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
            // validate: {
            //     min: 8,
            //     max: 32,
            //     passwordValidate(value){
            //         let counter = 0;
            //         if(value.match(/.*\\d.*/))
            //             counter ++;
            //         if(value.match(/.*[a-z].*/))
            //             counter ++;
            //         if(value.match(/.*[A-Z].*/))
            //             counter ++;
            //         if(value.match(/.*[*.!@#$%^&(){}[]:\";\'<>,.?\/~`_+-=|\\].*/))
            //             counter++;
            //
            //         if(counter < 3)
            //             throw new Error("Password must contain at least three of the following:\n 1. Numbers " +
            //                 "\n2. Lowercase letters \n3. Capital letters \n4.Punctuation characters. ")
            //     }
            // }
        },

        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isConfirmed(value){
                    if(value !== this.password)
                        throw new Error("Password confirmation is different than the password provided.");
                }
            }
        }
    });

    return User;
}