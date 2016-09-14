/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var bcrypt  = require('bcrypt-nodejs');

function User() {
    /** generate hash password **/
    cryptPassword = function(password, callback) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return callback(err);

            bcrypt.hash(password, salt, function(err, hash) {
                return callback(err, hash);
            });

        });
    };

    comparePassword = function(password, userPassword, callback) {
        bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
            if (err)
                return callback(err);
            return callback(null, isPasswordMatch);
        });
    };
    /*this.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };*/

    /** checking if password is valid **/
    /*this.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.passwd);
    };*/

    // TODO régler le problème de HASH du password qui ne se fait pas....
    this.create = function(req, res, connection) {
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = [
            "USERS","first_name","last_name","email","password",
            req.query.f_name,req.query.l_name,req.query.email,cryptPassword(req.query.password)
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
