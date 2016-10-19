/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../../CONFIG/dbconnect').sequelize;

var mypresent = sequelize.define('PRESENT', {
    role: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'role'
    },
    id_user: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_user',
        primaryKey: true
    },
    id_event: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_event',
        primaryKey: true
    }
}, {
    freezeTableName: true,
    tableName: 'PRESENT'
});

module.exports = {"mypresent": mypresent};