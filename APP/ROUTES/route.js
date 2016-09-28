/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql       = require("mysql");
var User        = require('../MODELS/users');
var Event       = require('../MODELS/events');
var Comment     = require('../MODELS/comments');
var Tag         = require('../MODELS/tags');
var List         = require('../MODELS/lists');
var Thing         = require('../MODELS/things');
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

    /**
     * REGISTER
     */
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

    /**
     * LOGIN
     */
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

    /**
     * LOGOUT
     */
    app.get('/api/logout', function(req, res) {
        req.logout();
        //res.redirect('/');
    });

    app.get('/api/loginView', function(req, res) {
        res.status(200).json({ message: 'LOGIN VIEW' });
    });

    /**
     * ADD EVENTS
     */
    app.post("/api/new/event",loggedIn,function(req,res) {
        Event.myevents.create({
            "title":        req.query.title,
            "date_start":   req.query.date_start,
            "date_end":     req.query.date_end,
            "description":  (req.query.description) ? req.query.description : null,
            "place":        (req.query.place) ? req.query.place : null,
            "id_manager":   (req.user.id_user) ? req.user.id_user : req.user.id_f
        }).then(function (result) {
            res.status(302).json({ message: 'EVENT INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion event **/
            console.log("ERROR : Lors de l'insertion event");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * GET EVENTS BY MANAGER
     */
    app.get("/api/get/eventsByManager",loggedIn,function(req,res) {
        Event.myevents.findAll(
            {
                attributes: ['id_event', 'title', 'date_start', 'date_end', 'description', 'place', 'id_manager'],
                where: {id_manager : 34}
            }
        ).then(function(events) {
            res.status(200).json({"events":events});
        }).catch(function (e) { /** Erreur dans la récupération des events **/
        console.log("ERROR : Lors de la récupération des events");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * ADD COMMENTS
     */
    app.post("/api/new/comment",loggedIn,function(req,res) {
        // TODO = NEED ID EVENT
        Comment.mycomments.create({
            "author":       req.query.author,
            "content":      req.query.content,
            "date_comment": moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            "img":          (req.query.img) ? req.query.img : null,
            "id_event":     /*req.query.id_event*/6,                                    // TODO : ID EVENT
            "id_comment_1": (req.query.id_comment_1) ? req.query.id_comment_1 : null    // TODO ; CHECK SI REPONSE A UN AUTRE COM
        }).then(function (result) {
            res.status(302).json({ message: 'COM INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion comments **/
            console.log("ERROR : Lors de l'insertion comments");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * GET COMMENTS
     */
    app.get("/api/get/comments",loggedIn,function(req,res) {
        Comment.mycomments.findAll(
            {
                attributes: ['id_comment', 'author', 'content', 'date_comment', 'img', 'id_event', 'id_comment_1'],
                where: {id_event : 6}                                                   // TODO : ID EVENT
            }
        ).then(function(comments) {
            res.status(200).json({"comments":comments});
        }).catch(function (e) { /** Erreur dans la récupération des comments **/
        console.log("ERROR : Lors de la récupération des comments");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * GET TAGS
     */
    app.get("/api/get/tags",loggedIn,function(req,res) {
        Tag.mytags.findAll(
            {
                attributes: ['id_tags', 'name'],
                where: sequelize.or({id_user : (req.user.id_user) ? req.user.id_user : req.user.id_f},{id_user : null})
            }
        ).then(function(tags) {
            res.status(200).json({"tags":tags});
        }).catch(function (e) { /** Erreur dans la récupération des tags **/
            console.log("ERROR : Lors de la récupération des tags");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * ADD TAGS
     */
    app.post("/api/new/tags",loggedIn,function(req,res) {
        Tag.mytags.create({
            "name":         req.query.name,
            "id_user":      (req.user.id_user) ? req.user.id_user : req.user.id_f
        }).then(function (result) {
            res.status(302).json({ message: 'TAGS INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion TAGS **/
        console.log("ERROR : Lors de l'insertion TAGS");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * ADD LIST
     */
    app.post("/api/new/list",loggedIn,function(req,res) {
        List.mylists.create({
            "name":         req.query.name,
            "id_user":      (req.user.id_user) ? req.user.id_user : req.user.id_f
        }).then(function (result) {
            res.status(302).json({ message: 'LIST INSERTED !' });
        }).catch(function (e) { /** Erreur dans l'insertion lists **/
        console.log("ERROR : Lors de l'insertion lists");
            res.status(400).json({ message: 'ERROR - Une erreur est survenue !' });
        });
    });

    /**
     * GET LIST
     */
    app.get("/api/get/lists",loggedIn,function(req,res) {
        List.mylists.findAll(
            {
                attributes: ['id_list', 'name', 'id_user'],
                where: {id_user : (req.user.id_user) ? req.user.id_user : req.user.id_f}
            }
        ).then(function(tags) {
            res.status(200).json({"lists":lists});
        }).catch(function (e) { /** Erreur dans la récupération des lists **/
        console.log("ERROR : Lors de la récupération des lists");
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
