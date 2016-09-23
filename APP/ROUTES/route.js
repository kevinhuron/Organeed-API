/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var User = require('../MODELS/users');
var Event = require('../MODELS/events');
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

    /****************** Register ****************/
    app.post("/api/register", passport.authenticate('local-signup', {
        successRedirect : '/api/successSignUp',
        failureRedirect : '/api/failureSignUp'
    }));

    app.get('/api/successSignUp', function(req, res) {
        res.status(200).json({ message: 'OK' });
    });

    app.get('/api/failureSignUp', function(req, res) {
        res.status(401).json({ message: 'NOK' });
    });
    /****************** End Register *************/

    /****************** Login ********************/
    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/api/successLogJson',
        failureRedirect : '/api/failureLogJson'
    }));

    app.get('/api/successLogJson', function(req, res) {
        res.json({ message: 'OK' });
    });

    app.get('/api/failureLogJson', function(req, res) {
        res.json({ message: 'NOK' });
    });
    /**************** End Login ****************/

    /**************** Logout ****************/
    app.get('/api/logout', function(req, res) {
        req.logout();
        //res.redirect('/');
    });
    /**************** End Logout ****************/

    app.get('/api/loginView', function(req, res) {
        res.status(200).json({ message: 'LOGIN VIEW' });
    });

    app.post("/api/new/event",loggedIn,function(req,res) {
        Event.myevents.create({
            "title":        req.query.title,
            "date_start":   req.query.date_start,
            "date_end":     req.query.date_end,
            "description":  (req.query.description) ? req.query.description : null,
            "place":        (req.query.place) ? req.query.place : null,
            "id_manager":   req.query.id_manager
        }).then(function (result) {
            res.status(302).json({ message: 'EVENT INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion event **/
            console.log("ERROR : Lors de l'insertion event");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });
};

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/api/loginView');
    }
}
/*function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}*/
