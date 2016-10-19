/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../../CONFIG/dbconnect').sequelize;

var myfriends = sequelize.define('FRIENDS', {
    id_user: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_user',
        primaryKey: true
    },
    id_friends: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_friends',
        primaryKey: true
    }
}, {
    freezeTableName: true,
    tableName: 'FRIENDS'
});

module.exports = {"myfriends": myfriends};