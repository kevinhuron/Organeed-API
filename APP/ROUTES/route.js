/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var User = require('../MODELS/users');
var bcrypt   = require('bcrypt-nodejs');
//var multer  = require('multer');
var moment  = require('moment');
//moment.locale('fr');
var sequelize = require('../CONFIG/dbconnect').sequelize;

/*function REST_ROUTER(router,connection,bcrypt, passport) {
    var self = this;
    self.handleRoutes(router,connection,bcrypt, passport);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,bcrypt) {
    router.get("/",function(req,res){
        res.json({"Message" : "YEAH CONNECTED TO THE REST API ROUTER"});
    });
    router.post("/new/user",function(req,res){
        users.create(req,res,connection);
    });
    router.post("/new/event",function(req,res){
        event.create(req,res,connection);
    });
    router.get("/get/event/:ranges/:rangef",function(req,res){
        event.get(req,res,connection, 3);
    });
};

module.exports = REST_ROUTER;*/

module.exports = function(app, connection) {

    app.get("/api/",function(req,res){
        res.json({"Message" : "YEAH CONNECTED TO THE REST API ROUTER the fucking better ahah"});
    });

    app.post("/api/register",function(req,res) {
        sequelize.query("INSERT INTO `USERS` (id_user,first_name,last_name,age,email,password,phone_number) VALUES (:id, :first_name, :last_name, :age, :email, :passwd, :phone_number) ",
            { replacements: {
                id: '',
                first_name:req.query.first_name,
                last_name:req.query.last_name,
                age:req.query.age,
                email:req.query.email,
                passwd:req.query.passwd,
                phone_number:(req.query.phone_number) ? req.query.phone_number : ''}, type: sequelize.QueryTypes.INSERT }
        ).then(function(user) {
            res.json({"Message" : "USER ADDED", user:user});
        });
        //User.create(req,res,connection);
    });


};