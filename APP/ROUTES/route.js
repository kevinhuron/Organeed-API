/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var User = require('../MODELS/users');
var bcrypt   = require('bcrypt-nodejs');
//var multer  = require('multer');
var moment  = require('moment');
//moment.locale('fr');
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

    app.get("/api/",function(req,res){
        res.json({"Message" : "YEAH CONNECTED TO THE REST API ROUTER the fucking better ahah"});
    });

    app.post('/api/blog', function(req, res) {
        //var offset = 0;
        //.skip(parseInt(offset)).limit(9).exec(
        /*Articles.find().sort([['idA', -1]]).exec(function(err, articles) {
            if (err) {
                res.send(err);
                console.log(err);
            }
            res.json({ articles: articles, user: req.user});
        });*/
    });


};