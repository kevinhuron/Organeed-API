/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../../CONFIG/dbconnect').sequelize;

var mylist_event = sequelize.define('LIST_EVENT', {
    id_list: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_list'
    },
    id_event: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_event'
    }
}, {
    freezeTableName: true,
    tableName: 'LIST_EVENT'
});

module.exports = {"mylist_event": mylist_event};