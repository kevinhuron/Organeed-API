/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../CONFIG/dbconnect').sequelize;

var mything = sequelize.define('THINGS', {
    id_thing: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_thing',
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'name',
        validate: {isAlphanumeric: true}
    },
    id_list: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_list'
    }
}, {
    freezeTableName: true,
    tableName: 'THINGS'
});

module.exports = {"mything": mything};