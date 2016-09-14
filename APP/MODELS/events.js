/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql = require("mysql");

function Event() {
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
        var query = "SELECT * FROM ?? WHERE id_manager = ?";
        var table = [
            "EVENTS",id
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
module.exports = new Event();
