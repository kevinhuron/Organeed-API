/**
 * Created by kevinhuron on 26/09/2016.
 */
var mysql = require("mysql");

var sequelize = require('../CONFIG/dbconnect').sequelize;

var mycomments = sequelize.define('COMMENTS', {
    id_comment: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_comment',
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'author',
        validate: {isAlphanumeric: true}
    },
    content: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        field: 'content'
    },
    date_comment: {
        type: sequelize.Sequelize.DATE,
        allowNull: false,
        field: 'date_comment'
    },
    img: {
        type: sequelize.Sequelize.STRING,
        allowNull: true,
        field: 'img'
    },
    id_event: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: false,
        field: 'id_event'
    },
    id_comment_1: {
        type: sequelize.Sequelize.INTEGER,
        allowNull: true,
        field: 'id_comment_1'
    }
}, {
    freezeTableName: true,
    tableName: 'COMMENTS'
});

module.exports = {"mycomments": mycomments};
