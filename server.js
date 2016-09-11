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
var bcrypt          = require('bcrypt');
var mysql           = require("mysql");
var route           = require('./APP/ROUTE/route.js');

/** Config DB file **/
//var db = require('./config/db') ;

var port = process.env.PORT || 8080;
var ip = '92.222.94.185';

function REST(){
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
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    var router = express.Router();
    app.use('/api', router);
    var rest_router = new route(router,connection,bcrypt);
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

new REST();


/*app.use(morgan('dev'));
//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
//app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'appsecret'}));
app.use(passport.initialize());
app.use(passport.session());
//app.use(multer({ dest: __dirname + '/public/img/article/' }));

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'WE YEAH! CONNECTED TO MY HARDCORE SERVER !kukjqdbhfbehjbrfhsvzj :D!' });
});

app.use('/api', router);*/

/** Router 
require('./app/routes')(app, passport);
**/

/** Start APP at http://92.222.94.185:80 **/
/*app.listen(port, ip);
console.log('CONNECTED sur le port ' + port);
exports = module.exports = app;*/