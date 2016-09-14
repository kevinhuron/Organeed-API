/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var bcrypt  = require('bcrypt-nodejs');

function User() {
    /** generate hash password **/
    this.generateHash = function(password) {
        bcrypt.genSalt(10, function(err, salt) {
            return bcrypt.hash(password, salt);
        });
        //return bcrypt.hash(password, bcrypt.genSalt(8), null);
    };

    /** checking if password is valid **/
    // TODO faire cette function
    /*this.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.passwd);
    };*/

    // TODO régler le problème de HASH du password qui ne se fait pas....
    this.create = function(req, res, connection) {
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
    };
}
module.exports = new User();