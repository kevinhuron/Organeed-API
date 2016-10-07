/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql       = require("mysql");
var sequelize   = require('../CONFIG/dbconnect').sequelize;
var moment      = require('moment');
moment.locale('fr');

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
        field: 'title'
    },
    date_start: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: false,
        field: 'date_start',
        get: function() {
            return moment.utc(this.getDataValue('date_start')).format('DD-MM-YYYY');
        }
    },
    hour_start: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'hour_start'
    },
    date_end: {
        type: sequelize.Sequelize.DATEONLY,
        allowNull: false,
        field: 'date_end',
        get: function() {
            return moment.utc(this.getDataValue('date_end')).format('DD-MM-YYYY');
        }
    },
    hour_end: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'hour_end'
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
