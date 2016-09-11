/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var bcrypt  = require('bcrypt-nodejs');

function REST_ROUTER(router,connection,bcrypt) {
    var self = this;
    self.handleRoutes(router,connection,bcrypt);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,bcrypt) {
    router.get("/",function(req,res){
        res.json({"Message" : "YEAH CONNECTED TO THE REST API ROUTER"});
    });
    router.post("/new/user",function(req,res){
        console.log(req);
        console.log(req.query.f_name);
        console.log(req.query.l_name);
        console.log(req.query.email);
        console.log(req.query.password);
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = [
            "USERS","first_name","last_name","email","password",
            req.query.f_name,req.query.l_name,req.query.email,bcrypt.hashSync(req.query.password, bcrypt.genSaltSync(10), null)
        ];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query = " + err});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });
    router.post("/new/event",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["EVENTS","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Event Added !"});
            }
        });
    });
};

module.exports = REST_ROUTER;