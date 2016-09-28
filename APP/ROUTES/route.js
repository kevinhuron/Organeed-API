/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql       = require("mysql");
var User        = require('../MODELS/users');
var Event       = require('../MODELS/events');
var Comment     = require('../MODELS/comments');
var Tag         = require('../MODELS/tags');
var bcrypt      = require('bcrypt-nodejs');
//var multer    = require('multer');
var moment      = require('moment');
moment.locale('fr');
var sequelize   = require('../CONFIG/dbconnect').sequelize;

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
        res.status(200).json({ message: 'OK' });
    });

    app.get('/api/failureLogJson', function(req, res) {
        res.status(401).json({ message: 'NOK' });
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
            "id_manager":   req.user.id_user
        }).then(function (result) {
            res.status(302).json({ message: 'EVENT INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion event **/
            console.log("ERROR : Lors de l'insertion event");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });
    app.post("/api/new/comment",loggedIn,function(req,res) {
        // TODO = NEED ID EVENT
        Comment.mycomments.create({
            "author":       req.query.author,
            "content":      req.query.content,
            "date_comment": moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            "img":          (req.query.img) ? req.query.img : null,
            "id_event":     /*req.query.id_event*/6,                                         // TODO : ID EVENT
            "id_comment_1": (req.query.id_comment_1) ? req.query.id_comment_1 : null    // TODO ; CHECK SI REPONSE A UN AUTRE COM
        }).then(function (result) {
            res.status(302).json({ message: 'COM INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion comments **/
            console.log("ERROR : Lors de l'insertion comments");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });
    app.get("/api/tags",loggedIn,function(req,res) {
        Tag.mytags.findAll(
            {attributes: ['id_tags', 'name'],where: sequelize.or({id_user : (req.user.id_user) ? req.user.id_user : req.user.id_f},{id_user : null})/*[{id_user: null}, {id_user: (req.user.id_user) ? req.user.id_user : req.user.id_f}]*/}
        ).then(function(tags) {
            res.status(200).json({"tags":tags});
        }).catch(function (e) { /** Erreur dans la récupération des tags **/
            console.log("ERROR : Lors de la récupération des tags");
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
