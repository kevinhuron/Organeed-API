var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../MODELS/users');

module.exports = function (passport) {

    /** Method par defaut de passport pour serialisation **/
    passport.serializeUser(function(user, done) {
        done(null, user.id_user);
    });

    /** Method par defaut de passport pour deserialisation **/
    passport.deserializeUser(function(id, done) {
        User.myusers.find({where: {id_user: id}}).then(function (user) {
            done(null, user);
        }).catch(function (e) {
            done(e, null);
        });
    });

    /** LOCAL SIGNUP **/
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.myusers.find({where: {email: email}}).then(function (user) {
                    /** check to see if theres already a user with that email **/
                    if (user) { /** Si l'user existe déjà **/
                        console.log("USER DEJA EXISTANT");
                        return done(null, false, {message:'L\'email ' + email + ' est déjà utilisé. Veuillez en saisir un autre.', type:'mailUse'});
                    } else {
                        /** save the user **/
                        User.myusers.create({
                            "first_name":   req.body.first_name,
                            "last_name":    req.body.last_name,
                            "age":          (req.body.age) ? req.body.age : null,
                            "email":        email,
                            "password":     User.mymethods.generateHash(password),
                            "phone_number": (req.query.phone_number) ? req.body.phone_number : null,
                            "img":          (req.body.img) ? req.body.img : null
                        }).then(function (result) {
                            return done(null, result);
                        }).catch(function (e) { /** Erreur dans l'inscription user **/
                            console.log("ERROR : Lors de l'inscription");
                            return done(e, null);
                        });
                    }
                }).catch(function (e) { /** Erreur dans la recherche de l'user **/
                    console.log("ERROR : Lors de la recherche");return done(e, null);
                });
            });
        }));
    /** END LOCAL SIGNUP **/

    /** LOCAL LOGIN **/
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            User.myusers.find({where: {email: email}}).then(function (user) {
                /** if no user is found **/
                if (!user) {
                    console.log('User Not Found with mail ' + email);
                    return done(null, false);
                }
                /** if user found but wrong passwd **/
                if (!User.mymethods.validPassword(password,user)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                console.log('User login succesful');
                /** return successful user **/
                return done(null, user);
            }).catch(function (e) { /** Erreur dans la recherche de l'user **/
                console.log("ERROR : Lors de la recherche");
                return done(e, null);
            });
        }));
    /** END LOCAL LOGIN **/


    /*passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        console.log(profile);
                        console.log(profile.id);
                        console.log(token);
                        console.log(profile.name.givenName);
                        console.log(profile.emails);
                        var newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.displayName; // look at the passport user profile to see how names are returned
                        //newUser.facebook.email = profile.emails.value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));*/
};