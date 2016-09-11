/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");

function Event() {
    //TODO faire la requete insertion event;
    /*this.create = function(req, res, connection) {
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = [
            "USERS","first_name","last_name","email","password",
            req.query.f_name,req.query.l_name,req.query.email,this.generateHash(req.query.password)
        ];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query = " + err});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    };*/
}
module.exports = new Event();
