/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../CONFIG/dbconnect').sequelize;

var mylists = sequelize.define('LIST', {
    id_list: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_list',
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'name',
        validate: {isAlphanumeric: true}
    },
    id_user: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
        field: 'content'
    }
}, {
    freezeTableName: true,
    tableName: 'LIST'
});

module.exports = {"mylists": mylists};
