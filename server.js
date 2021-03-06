/** modules **/
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var passport        = require('passport');
var session         = require('express-session');
var morgan          = require('morgan');
var multer  	    = require('multer');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var bcrypt          = require('bcrypt-nodejs');
var mysql           = require("mysql");
var cors            = require("cors");
//var route           = require('./APP/ROUTES/route.js');
//var Sequelize       = require("sequelize");

var sequelize = require('./APP/CONFIG/dbconnect').sequelize;

var port = process.env.PORT || 80;
var ip = '92.222.94.185';

/** CHECK BDD CONNECTION **/
sequelize.authenticate().then(function(err) {
    console.log('Connection TO BDD has been established successfully.');
}, function (err) {
    console.log('Unable to connect to the database:', err);
});

require('./APP/CONFIG/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'appsecret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(multer({ dest: __dirname + '/public/img/article/' }));

var router = express.Router();

//require('./APP/CONFIG/passport')(passport);
//app.use('/api', router);

/** ROUTER **/
require('./APP/ROUTES/route')(app, passport);

/** Start APP at http://92.222.94.185:80 **/
app.listen(port, ip);
console.log('SERVER CONNECTED sur le port ' + port);
exports = module.exports = app;

/*function REST(){
    var self = this;
    self.connectMysql();
}

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'sx62iBL5y83FM',
        database : 'organeed',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
            self.stop(err);
        } else {
            self.configureExpress(connection);
        }
    });
};

REST.prototype.configureExpress = function(connection) {
    var self = this;
    require('./APP/CONFIG/passport')(passport, connection);
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({secret: 'appsecret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    var router = express.Router();
    app.use('/api', router);
    /*var rest_router = new route(router,connection,bcrypt, passport);
    self.startServer();
};

REST.prototype.startServer = function() {
    app.listen(port, ip, function(){
        console.log("CONNECTED sur le port " + port);
    });
};

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
};

new REST();*/
