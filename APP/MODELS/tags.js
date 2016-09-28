/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../CONFIG/dbconnect').sequelize;

var mytags = sequelize.define('TAGS', {
    id_tags: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_tags',
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
        field: 'id_user'
    }
}, {
    freezeTableName: true,
    tableName: 'TAGS'
});

module.exports = {"mytags": mytags};
