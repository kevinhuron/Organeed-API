/**
 * Created by kevinhuron on 11/09/2016.
 */
var Sequelize   = require('sequelize');
var mysql       = require("mysql");
var bcrypt      = require('bcrypt-nodejs');

var sequelize = require('../CONFIG/dbconnect').sequelize;

module.exports = function(sequelize, DataTypes) {
var Users = sequelize.define('users', {
    //local               : {
    id_user: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    last_name: {type: DataTypes.STRING, allowNull: false, field: 'last_name'},
    first_name: {type: DataTypes.STRING, allowNull: false, field: 'first_name'},
    age: {type: DataTypes.INTEGER, allowNull: true, field: 'age'},
    email: {type: DataTypes.STRING, allowNull: false, field: 'email'},
    passwd: {type: DataTypes.STRING, allowNull: false, field: 'passwd'},
    phone_number: {type: DataTypes.INTEGER, allowNull: true, field: 'phone_number'},
    img: {type: DataTypes.STRING, allowNull: true, field: 'img'},
    //},
    //facebook            : {
    id_f: {type: DataTypes.STRING, allowNull: true, field: 'id_f'},
    token_f: {type: DataTypes.STRING, allowNull: true, field: 'token_f'},
    //email         : String
    name_f: {type: DataTypes.STRING, allowNull: true, field: 'name_f'},
    img_f: {type: DataTypes.STRING, allowNull: true, field: 'img_f'}
    //}
}, {
        freezeTableName: true,
        instanceMethods: {
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            },
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
        }
    });

    return User;
}

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