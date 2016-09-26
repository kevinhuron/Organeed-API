/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../CONFIG/dbconnect').sequelize;

var myevents = sequelize.define('EVENTS', {
    id_event: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_event',
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'title',
        validate: {isAlphanumeric: true}
    },
    date_start: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        field: 'date_start'
    },
    date_end: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        field: 'date_end'
    },
    description: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        field: 'description'
    },
    place: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        field: 'place'
    },
    id_manager: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_manager'
    }
}, {
    freezeTableName: true,
    tableName: 'EVENTS'
});

module.exports = {"myevents": myevents};
