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

module.exports = function(app, passport) {

    app.get("/api/",function(req,res) {
        /*User.myusers.findAll().then(function(user) {
            res.json({"myusers":user});
        }).catch(function(e) {
            console.log("ERREUR TA MERE = " + e);
        });*/
        console.log(req);
        //res.json({"Message" : "YEAH CONNECTED TO THE REST API ROUTER the fucking better ahah"});
    });
//local-signup
    app.post("/api/register", passport.authenticate('local-signup', {
        successRedirect : '/api/successSignUp',
        failureRedirect : '/api/failureSignUp'
    }));

    app.get('/api/successSignUp', function(req, res) {
        res.json({ message: 'OK' });
    });

    app.get('/api/failureSignUp', function(req, res) {
        res.json({ message: 'NOK' });
    });
    /*app.post("/api/register",function(req,res) {
        sequelize.query("INSERT INTO `USERS` (id_user,first_name,last_name,age,email,password,phone_number) VALUES (:id, :first_name, :last_name, :age, :email, :passwd, :phone_number) ",
            { replacements: {
                id: '',
                first_name:req.query.first_name,
                last_name:req.query.last_name,
                age:(req.query.age) ? req.query.age : '',
                email:req.query.email,
                passwd:generateHash(req.query.passwd),
                phone_number:(req.query.phone_number) ? req.query.phone_number : ''}, type: sequelize.QueryTypes.INSERT }
        ).then(function(user) {
            res.json({"Message" : "USER ADDED", "user_id":user});
        });
        //User.create(req,res,connection);
    });
    app.post("/api/new/event",function(req,res) {
        sequelize.query("INSERT INTO `EVENTS` (id_event,title,date_start,date_end,description,place,id_manager) VALUES (:id, :title, :date_start, :date_end, :description, :place, :id_manager) ",
            { replacements: {
                id: '',
                title:req.query.title,
                date_start:req.query.date_start,
                date_end:req.query.date_end,
                description:(req.query.description) ? req.query.description : '',
                place:(req.query.place) ? req.query.place : '',
                id_manager:13}, type: sequelize.QueryTypes.INSERT }
        ).then(function(event) {
            res.json({"Message" : "EVENT ADDED", "event_id":event});
        });
        //User.create(req,res,connection);
    });*/
};

/*function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}*/
