/**
 * Created by kevinhuron on 18/09/2016.
 */
var Sequelize = require('sequelize')
    , mysql = require('mysql');

/** CONFIG DB FILE **/
var db = require('db');


/** SETTING UP BDD CONFIG **/
var sequelize = new Sequelize(db.dbname, db.dbusername, db.mdp, {
    host: db.host,
    port: 3306,
    dialect: 'mysql'
});

exports.sequelize = sequelize;