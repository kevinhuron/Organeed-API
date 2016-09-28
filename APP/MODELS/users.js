/**
 * Created by kevinhuron on 11/09/2016.
 */
var Sequelize   = require('sequelize');
var mysql       = require("mysql");
var bcrypt      = require('bcrypt-nodejs');

var sequelize   = require('../CONFIG/dbconnect').sequelize;

var mymethods   = {generateHash: null, validPassword: null};

var myusers = sequelize.define('USERS', {
    id_user: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_user',
        autoIncrement: true,
        primaryKey: true
    },
    last_name: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        field: 'last_name',
        validate: {isAlphanumeric: true}
    },
    first_name: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        field: 'first_name',
        validate: {isAlphanumeric: true}
    },
    age: {type: sequelize.Sequelize.INTEGER, allowNull: true, field: 'age', validate: {isNumeric: true}},
    email: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'email', validate: {isEmail: true}},
    password: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'password'},
    phone_number: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
        field: 'phone_number',
        validate: {isNumeric: true}
    },
    img: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'img', validate: {isAlphanumeric: true}},
    id_f: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'id_f'},
    token_f: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'token_f'},
    name_f: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'name_f'},
    img_f: {type: sequelize.Sequelize.STRING, allowNull: true, field: 'img_f'}
}, {
    freezeTableName: true,
    tableName: 'USERS'
});


mymethods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

mymethods.validPassword = function (password, Users) {
    return bcrypt.compareSync(password, Users.password, null);
};

module.exports = {"myusers": myusers, "mymethods": mymethods};

// TODO: instancier tout ce qui est lié à un user pour faire les relations
