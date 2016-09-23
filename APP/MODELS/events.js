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
/*function Event() {
    this.create = function(req, res, connection) {
        var query = "INSERT INTO ??(??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
        var table = [
            "EVENTS","title","date_start","date_end","description","place","id_manager",
            req.query.title,req.query.date_start,req.query.date_end,req.query.description,req.query.place, // TODO id user
        ];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query = " + err});
            } else {
                res.json({"Error" : false, "Message" : "Event Added !"});
            }
        });
    };
    this.get = function(req, res, connection, id) {
        var query = "SELECT * FROM ?? WHERE id_manager = ? LIMIT ?,? ";
        var table = [
            "EVENTS",id,parseInt(req.params.ranges),parseInt(req.params.rangef)
        ];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query = " + err});
            } else {
                res.json({"Error" : false, "Message" : "Event get !", "row" : rows});
            }
        });
    };
}
module.exports = new Event();*/
