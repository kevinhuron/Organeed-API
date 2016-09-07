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

/** Config DB file **/
//var db = require('./config/db') ;

var port = process.env.PORT || 80;
var ip = '92.222.94.185';


app.use(morgan('dev'));
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
    res.json({ message: 'YEAH! CONNECTED TO MY .... :D!' });
});

app.use('/api', router);

/** Router 
require('./app/routes')(app, passport);
**/

/** Start APP at http://92.222.94.185:80 **/
app.listen(port, ip);
console.log('CONNECTED sur le port ' + port);
exports = module.exports = app;
