/**
 * Created by kevinhuron on 11/09/2016.
 */
var Sequelize   = require('sequelize');
var mysql       = require("mysql");
var bcrypt      = require('bcrypt-nodejs');

var sequelize = require('../CONFIG/dbconnect').sequelize;

var mymethods = {generateHash: null, validPassword: null};

//module.exports = function(sequelize, DataTypes) {
var myusers = sequelize.define('USERS', {
    //local               : {
    id_user:        {type: sequelize.Sequelize.INTEGER, allowNull: false, field: 'id_user', autoIncrement: true, primaryKey: true},
    last_name:      {type: sequelize.Sequelize.STRING, allowNull: true, field: 'last_name', validate:{isAlphanumeric:true}},
    first_name:     {type: sequelize.Sequelize.STRING, allowNull: true, field: 'first_name', validate:{isAlphanumeric:true}},
    age:            {type: sequelize.Sequelize.INTEGER, allowNull: true, field: 'age', validate:{isNumeric:true}},
    email:          {type: sequelize.Sequelize.STRING, allowNull: true, field: 'email', validate:{isEmail:true}},
    password:       {type: sequelize.Sequelize.STRING, allowNull: true, field: 'password'},
    phone_number:   {type: sequelize.Sequelize.INTEGER, allowNull: true, field: 'phone_number', validate:{isNumeric:true}},
    img:            {type: sequelize.Sequelize.STRING, allowNull: true, field: 'img', validate:{isAlphanumeric:true}},
    //},
    //facebook            : {
    id_f:           {type: sequelize.Sequelize.STRING, allowNull: true, field: 'id_f'},
    token_f:        {type: sequelize.Sequelize.STRING, allowNull: true, field: 'token_f'},
    //email         : String
    name_f:         {type: sequelize.Sequelize.STRING, allowNull: true, field: 'name_f'},
    img_f:          {type: sequelize.Sequelize.STRING, allowNull: true, field: 'img_f'}
    //}
}, {
    freezeTableName: true,
    /*classMethod: {
        generateHash: function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
        validPassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        }
    },*/
    tableName : 'USERS'
    });

    //return Users;
//};

mymethods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null);
};

mymethods.validPassword = function(password, Users) {
    return bcrypt.compareSync(password, Users.password, null);
};

module.exports = {"myusers":myusers, "mymethods":mymethods};



// TODO: instancier tout ce qui est lié à un user pour faire les relations
/*Users.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
Users.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwd);
};*/

//module.exports = Users;





/*function User() {
 /** generate hash password *
 this.generateHash = function(password) {
 bcrypt.genSalt(10, function(err, salt) {
 bcrypt.hash(password, salt, function(err, hash) {
 return hash;
 });
 });
 //return bcrypt.hash(password, bcrypt.genSalt(8), null);
 };

 /** checking if password is valid *
 // TODO faire cette function
 /*this.validPassword = function(password) {
 return bcrypt.compareSync(password, this.local.passwd);
 };

 // TODO régler le problème de HASH du password qui ne se fait pas....
 this.create = function(req, res, connection) {
 var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
 var table = [
 "USERS","first_name","last_name","email","password",
 req.query.f_name,req.query.l_name,req.query.email,this.generateHash(req.query.password)
 ];
 query = mysql.format(query,table);
 connection.query(query,function(err,rows){
 if(err) {
 res.json({"Error" : true, "Message" : "Error executing MySQL query = " + err});
 } else {
 res.json({"Error" : false, "Message" : "User Added !"});
 }
 });
 };
 }
 module.exports = new User();*/