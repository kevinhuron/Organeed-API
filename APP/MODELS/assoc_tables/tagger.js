/**
 * Created by kevinhuron on 28/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../../CONFIG/dbconnect').sequelize;

var mytagger = sequelize.define('LIST', {
    id_tags: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_tags',
        primaryKey: true
    },
    id_comment: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_comment',
        primaryKey: true
    }
}, {
    freezeTableName: true,
    tableName: 'TAGGER'
});

module.exports = {"mytagger": mytagger};