/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql = require("mysql");
var User = require('../MODELS/users');
var Event = require('../MODELS/events');
var Comment = require('../MODELS/comments');
var Tag = require('../MODELS/tags');
var List = require('../MODELS/lists');
var Thing = require('../MODELS/things');
var Tagger = require('../MODELS/assoc_tables/tagger');
var Friend = require('../MODELS/assoc_tables/friends');
var Present = require('../MODELS/assoc_tables/present');
var List_event = require('../MODELS/assoc_tables/list_event');
var bcrypt = require('bcrypt-nodejs');
//var multer    = require('multer');
var moment = require('moment');
moment.locale('fr');
var sequelize = require('../CONFIG/dbconnect').sequelize;

module.exports = function (app, passport) {

    app.get("/api/", function (req, res) {
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
        successRedirect: '/api/successSignUp',
        failureRedirect: '/api/failureSignUp'
    }));

    app.get('/api/successSignUp', function (req, res) {
        res.status(200).json({message: 'OK'});
    });

    app.get('/api/failureSignUp', function (req, res) {
        res.status(401).json({message: 'NOK'});
    });

    /**
     * LOGIN
     */
    app.post('/api/login', passport.authenticate('local-login', {
        successRedirect: '/api/successLogJson',
        failureRedirect: '/api/failureLogJson'
    }));

    app.get('/api/successLogJson', function (req, res) {
        res.status(200).json({message: 'OK', userid: req.user.id_user});
    });

    app.get('/api/failureLogJson', function (req, res) {
        res.status(401).json({message: 'NOK'});
    });

    /**
     * LOGOUT
     */
    app.get('/api/logout', function (req, res) {
        req.logout();
        res.status(200).json({message: 'LOGOUTOK'});
        console.log('logout');
    });

    app.get('/api/loginView', function (req, res) {
        res.status(200).json({message: 'LOGIN VIEW'});
    });

    /**
     * ADD EVENTS
     */
    app.post("/api/new/event", loggedIn, function (req, res) {
        Event.myevents.create({
            "title": req.body.title,
            "date_start": req.body.date_start,
            "hour_start": req.body.hour_start,
            "date_end": req.body.date_end,
            "hour_end": req.body.hour_end,
            "description": (req.body.description) ? req.body.description : null,
            "place": (req.body.place) ? req.body.place : null,
            "lat": (req.body.lat) ? req.body.lat : null,
            "lng": (req.body.lng) ? req.body.lng : null,
            "id_manager": (req.user.id_user) ? req.user.id_user : req.user.id_f
        }).then(function (result) {
            res.status(200).json({message: 'EVENT INSERTED !', code: '200'});
        }).catch(function (e) {
            /** Erreur dans l'insertion event **/
            console.log("ERROR : Lors de l'insertion event = " + e);
            console.log("ERROR : " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !', code: '100'});
        });
    });

    /**
     * GET EVENTS BY MANAGER
     */
    app.get("/api/get/eventsByManager", loggedIn, function (req, res) {
        /*Event.myevents.findAll(
         {
         attributes: ['id_event', 'title', 'date_start', 'hour_start', 'date_end', 'hour_end', 'description', 'place', 'id_manager'],
         where: {id_manager : req.user.id_user},
         order: 'id_event DESC'
         } // CONCAT(title, ' ', place) LIKE '%test%';
         ).*/
        if (req.query.querySearch) {
            sequelize.query(
                "SELECT `EVENTS`.`id_event`, `EVENTS`.`title`, `EVENTS`.`date_start`, `EVENTS`.`hour_start`, " +
                "`EVENTS`.`date_end`, `EVENTS`.`hour_end`, `EVENTS`.`description`, `EVENTS`.`place`, `EVENTS`.`lat`, `EVENTS`.`lng`, `EVENTS`.`id_manager` " +
                "FROM `EVENTS` WHERE `EVENTS`.`id_manager` = :id_manager AND CONCAT(title, ' ', place) LIKE :querytext ORDER BY id_event DESC",
                {
                    replacements: {id_manager: req.user.id_user, querytext: '%' + req.query.querySearch + '%'},
                    type: sequelize.QueryTypes.SELECT
                }
            ).then(function (events) {
                res.status(200).json({"events": events, "user": req.user});
            }).catch(function (e) {
                /** Erreur dans la récupération des events **/
                console.log("ERROR : Lors de la récupération des events = " + e);
                res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
            });
        } else {
            sequelize.query(
                "SELECT `EVENTS`.`id_event`, `EVENTS`.`title`, `EVENTS`.`date_start`, `EVENTS`.`hour_start`, " +
                "`EVENTS`.`date_end`, `EVENTS`.`hour_end`, `EVENTS`.`description`, `EVENTS`.`place`, `EVENTS`.`id_manager` " +
                "FROM `EVENTS` WHERE `EVENTS`.`id_manager` = :id_manager ORDER BY id_event DESC",
                {replacements: {id_manager: req.user.id_user}, type: sequelize.QueryTypes.SELECT}
            ).then(function (events) {
                res.status(200).json({"events": events, "user": req.user});
            }).catch(function (e) {
                /** Erreur dans la récupération des events **/
                console.log("ERROR : Lors de la récupération des events = " + e);
                res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
            });
        }
    });

    /**
     * ADD COMMENTS
     */
    app.post("/api/new/comment", loggedIn, function (req, res) {
        // TODO = NEED ID EVENT
        Comment.mycomments.create({
            "author": req.user.id_user,
            "content": req.body.content,
            "date_comment": moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            "img": (req.body.img) ? req.body.img : null,
            "id_event": req.body.id_event,                                    // TODO : ID EVENT par rapport à l'app
            "id_comment_1": (req.body.id_comment_1) ? req.body.id_comment_1 : null    // TODO : CHECK SI REPONSE A UN AUTRE COM
        }).then(function (result) {
            res.status(200).json({message: 'COM INSERTED !', last_id: result.dataValues.id_comment});
        }).catch(function (e) {
            /** Erreur dans l'insertion comments **/
            console.log("ERROR : Lors de l'insertion comments = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * GET COMMENTS
     */
    app.get("/api/get/comments", loggedIn, function (req, res) {
        sequelize.query("SELECT * FROM COMMENTS INNER JOIN USERS ON USERS.id_user = COMMENTS.author " +
            "WHERE id_event = :id_event",
            {replacements: {id_event: req.query.id_event}, type: sequelize.QueryTypes.SELECT}
        ).then(function (comments) {
            res.status(200).json({"comments": comments, "user": req.user});
        }).catch(function (e) {
            /** Erreur dans la récupération des comments **/
            console.log("ERROR : Lors de la récupération des comments = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });

        /*Comment.mycomments.findAll(
         {
         attributes: ['id_comment', 'author', 'content', 'date_comment', 'img', 'id_event', 'id_comment_1'],
         where: {id_event: req.query.id_event}
         }
         ).then(function (comments) {
         res.status(200).json({"comments": comments, "user": req.user});
         }).catch(function (e) {
         /** Erreur dans la récupération des comments **
         console.log("ERROR : Lors de la récupération des comments = " + e);
         res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
         });*/
    });

    /**
     * GET TAGS
     */
    app.get("/api/get/tags", loggedIn, function (req, res) {
        Tag.mytags.findAll(
            {
                attributes: ['id_tags', 'name', 'color'],
                where: sequelize.or({id_user: (req.user.id_user) ? req.user.id_user : req.user.id_f}, {id_user: null})
            }
        ).then(function (tags) {
            res.status(200).json({"tags": tags, "user": req.user});
        }).catch(function (e) {
            /** Erreur dans la récupération des tags **/
            console.log("ERROR : Lors de la récupération des tags = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });
    /**
     * GET TAGS BY ID
     */
    app.get("/api/get/tagsById", loggedIn, function (req, res) {
        var string = req.query.id_tag;
        var arrayIds = string.split(",");
        Tag.mytags.findAll(
            {
                attributes: ['id_tags', 'name', 'color'],
                where: {id_tags: [arrayIds]}
            }
        ).then(function (tags) {
            res.status(200).json({"tags": tags, "user": req.user});
        }).catch(function (e) {
            /** Erreur dans la récupération des tags by id **/
            console.log("ERROR : Lors de la récupération des tags by id = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });
    /**
     * GET TAGS ID
     */
    app.get("/api/get/tagColorByIdCom", loggedIn, function (req, res) {
        sequelize.query("SELECT color FROM TAGS INNER JOIN TAGGER ON TAGS.id_tags = TAGGER.id_tags INNER JOIN COMMENTS ON COMMENTS.id_comment = TAGGER.id_comment " +
            " WHERE TAGGER.id_comment = :id_comment",
            {replacements: {id_comment: req.query.id_comment}, type: sequelize.QueryTypes.SELECT}
        ).then(function (result) {
            res.status(200).json({"result": result, "user": req.user});
        }).catch(function (e) {
            /** Erreur dans la récupération des color **/
            console.log("ERROR : Lors de la récupération des color = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
        /*Tagger.mytagger.findAll(
         {
         attributes: ['id_tags', 'id_comment'],
         where: {id_comment: req.query.id_comment}
         }
         ).then(function (ids) {
         res.status(200).json({"ids": ids, "user": req.user});
         }).catch(function (e) {
         /** Erreur dans la récupération des tags by id **
         console.log("ERROR : Lors de la récupération des tags by id = " + e);
         res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
         });*/
    });

    /**
     * ADD TAGS
     */
    app.post("/api/new/tags", loggedIn, function (req, res) {
        Tag.mytags.create({
            "name": req.query.name,
            "id_user": (req.user.id_user) ? req.user.id_user : req.user.id_f
        }).then(function (result) {
            res.status(200).json({message: 'TAGS INSERTED !'});
        }).catch(function (e) {
            /** Erreur dans l'insertion TAGS **/
            console.log("ERROR : Lors de l'insertion TAGS = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * ADD LIST
     */
    app.post("/api/new/list", loggedIn, function (req, res) {
        List.mylists.create({
            "name": req.query.name,
            "id_user": (req.user.id_user) ? req.user.id_user : req.user.id_f
        }).then(function (result) {
            res.status(200).json({message: 'LIST INSERTED !'});
        }).catch(function (e) {
            /** Erreur dans l'insertion lists **/
            console.log("ERROR : Lors de l'insertion lists = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !', error: e});
        });
    });

    /**
     * GET LIST
     */
    app.get("/api/get/lists", loggedIn, function (req, res) {
        List.mylists.findAll(
            {
                attributes: ['id_list', 'name', 'id_user'],
                where: {id_user: (req.user.id_user) ? req.user.id_user : req.user.id_f}
            }
        ).then(function (lists) {
            res.status(200).json({"lists": lists});
        }).catch(function (e) {
            /** Erreur dans la récupération des lists **/
            console.log("ERROR : Lors de la récupération des lists = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * ADD THINGS
     */
    app.post("/api/new/thing", loggedIn, function (req, res) {
        Thing.mything.create({
            "name": req.query.name,
            "id_list": 3,
            "checked": 0
        }).then(function (result) {
            res.status(200).json({message: 'THINGS INSERTED !'});
        }).catch(function (e) {
            /** Erreur dans l'insertion THINGS **/
            console.log("ERROR : Lors de l'insertion THINGS = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * GET THINGS
     */
    app.get("/api/get/thingsInList", loggedIn, function (req, res) {
        Thing.mything.findAll(
            {
                attributes: ['id_list', 'name', 'id_user'],
                where: {id_list: 3}
            }
        ).then(function (things) {
            res.status(200).json({"things": things});
        }).catch(function (e) {
            /** Erreur dans la récupération des things **/
            console.log("ERROR : Lors de la récupération des things = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * LINK TAG AND COMMENT
     */
    app.post("/api/add/tagToComment", loggedIn, function (req, res) {
        console.log(req);
        Tagger.mytagger.create({
            "id_tags": req.body.id_tags,                                           // TODO: id du tag par rapport à l'app
            "id_comment": req.body.id_comment                                         // TODO: id du comment par rapport à l'app
        }).then(function (result) {
            res.status(200).json({message: 'LINK TAG AND COMMENT OKKK !'});
        }).catch(function (e) {
            /** Erreur **/
            console.log("ERROR : Lors de l'association des tags et des comments = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * LINK USER AND USER (FRIENDS)
     */
    app.post("/api/add/friends", loggedIn, function (req, res) {
        Friend.myfriends.create({
            "id_user": req.user.id_user,                                           // TODO: id de l'user par rapport à l'app
            "id_friends": req.query.id_friends                                         // TODO: id de l'user par rapport à l'app
        }).then(function (result) {
            res.status(200).json({message: 'LINK USER AND USER (FRIENDS) OKKK !'});
        }).catch(function (e) {
            /** Erreur **/
            console.log("ERROR : Lors de l'association des users et des friends = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * LINK USER AND EVENT WITH ROLE
     */
    app.post("/api/add/userInEvent", loggedIn, function (req, res) {
        Present.mypresent.create({
            "role": req.query.role,
            "id_user": req.query.id_user,                                         // TODO: id de l'user par rapport à l'app
            "id_event": req.query.id_event                                         // TODO: id de l'event par rapport à l'app
        }).then(function (result) {
            res.status(200).json({message: 'LINK USER AND EVENT WITH ROLE OKKK !'});
        }).catch(function (e) {
            /** Erreur **/
            console.log("ERROR : Lors de l'association des users et des events avec leur rôle = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * LINK LIST AND EVENT
     */
    app.post("/api/add/listInEvent", loggedIn, function (req, res) {
        List_event.mylist_event.create({
            "id_list": req.query.id_list,                                         // TODO: id de la list par rapport à l'app
            "id_event": req.query.id_event                                         // TODO: id de l'event par rapport à l'app
        }).then(function (result) {
            res.status(200).json({message: 'LINK LIST AND EVENT OKKK !'});
        }).catch(function (e) {
            /** Erreur **/
            console.log("ERROR : Lors de l'association des lists et des events = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * GET LIST COMMENTS BY TAG
     */
    app.get("/api/get/commentsByTag", loggedIn, function (req, res) {
        sequelize.query(
            "SELECT `COMMENTS`.`id_comment`, `COMMENTS`.`author`, `COMMENTS`.`content`, `COMMENTS`.`date_comment`, " +
            "`COMMENTS`.`img`, `COMMENTS`.`id_event`, `COMMENTS`.`id_comment_1` " +
            "FROM `COMMENTS` INNER JOIN `TAGGER` ON `COMMENTS`.`id_comment` = `TAGGER`.`id_comment` WHERE `TAGGER`.`id_tags` IN(:id_tag)",
            {replacements: {id_tag: [req.query.id_tags]}, type: sequelize.QueryTypes.SELECT}        // TODO: Ids tags par rapport à l'app
        ).then(function (comments) {                                                                     // TODO: A envoyé en tant que ARRAY (je pense)
            res.status(200).json({"comments": comments});                                                // TODO: Vérifié la query exécutée
        }).catch(function (e) {
            /** Erreur dans la récupération des comments by tag **/
            console.log("ERROR : Lors de la récupération des comments by tag = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * GET LAT LNG EVENTS BY MANAGER
     */
    app.get("/api/get/latLngEvents", loggedIn, function (req, res) {
        Event.myevents.findAll(
            {
                attributes: ['id_event', 'title', 'date_start', 'hour_start', 'date_end', 'hour_end', 'lat', 'lng', 'id_manager'],
                where: {id_manager: req.user.id_user}
            }
        ).then(function (result) {
            res.status(200).json({"latlng": result});
        }).catch(function (e) {
            /** Erreur dans la récupération lat lng **/
            console.log("ERROR : Lors de la récupération des lat lng = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
        /*sequelize.query(
         "SELECT `COMMENTS`.`id_comment`, `COMMENTS`.`author`, `COMMENTS`.`content`, `COMMENTS`.`date_comment`, " +
         "`COMMENTS`.`img`, `COMMENTS`.`id_event`, `COMMENTS`.`id_comment_1` " +
         "FROM `COMMENTS` INNER JOIN `TAGGER` ON `COMMENTS`.`id_comment` = `TAGGER`.`id_comment` WHERE `TAGGER`.`id_tags` IN(:id_tag)",
         {replacements: {id_tag: [req.query.id_tags]}, type: sequelize.QueryTypes.SELECT}        // TODO: Ids tags par rapport à l'app
         ).then(function (comments) {                                                                     // TODO: A envoyé en tant que ARRAY (je pense)
         res.status(200).json({"comments": comments});                                                // TODO: Vérifié la query exécutée
         }).catch(function (e) {
         /** Erreur dans la récupération des comments by tag **
         console.log("ERROR : Lors de la récupération des comments by tag = " + e);
         res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
         });*/
    });

    /**
     * GET INFO USER BY ID
     */
    app.get("/api/get/userById", loggedIn, function (req, res) {
        User.myusers.findAll(
            {
                attributes: ['id_user', 'last_name', 'first_name', 'age', 'email', 'phone_number', 'img'],
                where: {id_user: req.user.id_user}
            }
        ).then(function (result) {
            res.status(200).json({"userInfo": result});
        }).catch(function (e) {
            /** Erreur dans la récupération de l'user **/
            console.log("ERROR : Lors de la récupération  de l'user = " + e);
            res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
        });
    });

    /**
     * UPDATE INFO USER BY ID
     */
    app.post("/api/update/userById", loggedIn, function (req, res) {
        if (req.body.email) {
            User.myusers.find({where: {email: req.body.email}}).then(function (user) {
                if (user) {
                    console.log("EMAIL DEJA EXISTANT");
                    res.status(401).json({message: "Cette email est déjà utilisé."});
                } else {
                    User.myusers.update(
                        {email: req.body.email}, {where: {id_user: req.user.id_user}}
                    ).then(function (result) {
                        res.status(200).json({"userInfo": result});
                    }).catch(function (e) {
                        /** Erreur dans la récupération de l'update de l'user **/
                        console.log("ERROR : Lors de la récupération  de l'update de l'user = " + e);
                        res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
                    });
                }
            }).catch(function (e) {
                /** Erreur dans la recherche de l'user **/
                console.log("ERROR : Lors de la recherche = " + e);
            });
        } else {
            User.myusers.update(
                (req.body.password) ? {password: User.mymethods.generateHash(req.body.password)} : req.body
                , {where: {id_user: req.user.id_user}}
            ).then(function (result) {
                res.status(200).json({"userInfo": result});
            }).catch(function (e) {
                /** Erreur dans la récupération de l'update de l'user **/
                console.log("ERROR : Lors de la récupération  de l'update de l'user = " + e);
                res.status(400).json({message: 'ERROR - Une erreur est survenue !'});
            });
        }
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

