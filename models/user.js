const { Sequelize, Model } = require('sequelize')
const bcrypt = require("bcrypt")
const uuid = require('uuid/v4')
const config = require('../config.js')
const sequelize = config.sequelize

class User extends Model { }

User.init({
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4,
        defaultValue: uuid()
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Name can not be empty' },
            notEmpty: { msg: 'Name can not be empty' },
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password can not be empty' },
            notEmpty: { msg: 'Password can not be empty' },
        }
    }
}, {
    sequelize: sequelize,
    modelName: 'users',
    timestamps: false,
    hooks: {
        beforeCreate: (user) => {
            user.password = bcrypt.hashSync(user.password, config.saltRounds)
        }
    },
});

User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

User.sync({ force: true }).then(() => {
    console.log("User table created")
    User.create({ id: uuid(), userName: 'sdfsf', password: 'sdfsdf' })
});

module.exports = User