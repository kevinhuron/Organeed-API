/**
 * Created by kevinhuron on 11/09/2016.
 */
var mysql   = require("mysql");
var bcrypt  = require('bcrypt-nodejs');
var users   = require('../MODELS/users');
var event   = require('../MODELS/events');

function REST_ROUTER(router,connection,bcrypt) {
    var self = this;
    self.handleRoutes(router,connection,bcrypt);
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

module.exports = REST_ROUTER;