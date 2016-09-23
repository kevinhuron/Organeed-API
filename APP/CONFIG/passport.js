var LocalStrategy = require('passport-local').Strategy;
var User = require('../MODELS/users');

module.exports = function (passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id_user);
    });

    passport.deserializeUser(function(id, done) {
        User.myusers.find({where: {id_user: id}}).then(function (err, user) {
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
                User.myusers.findOne({where: {email: email}}).then(function (err, user) {
                    /** if errors, return the error **/
                    if (err)
                        return done(err);
                    /** check to see if theres already a user with that email **/
                    if (user) {
                        return done(null, false, {message:'L\'email ' + email + ' est déjà utilisé. Veuillez en saisir un autre.', type:'mailUse'});
                    } else {
                        /** save the user **/
                        User.myusers.create({
                            "first_name":   req.query.first_name,
                            "last_name":    req.query.last_name,
                            "age":          (req.query.age) ? req.query.age : null,
                            "email":        email,
                            "password":     User.mymethods.generateHash(password),
                            "phone_number": (req.query.phone_number) ? req.query.phone_number : null,
                            "img":          (req.query.img) ? req.query.img : null
                        }).then(function (result) {
                            return done(null, User.myusers.id_user);
                        }).catch(function (e) { // Erreur dans l'inscription user \\
                            return done(e, {message: 'Erreur lors que l\'inscription user', type: 'singupFail', error:e});
                        });
                    }
                }).catch(function (e) { // Erreur dans la recherche de l'user \\
                    return done(e, {message: 'Erreur lors de la recherche user', type: 'searchSingupFail', error:e});
                });
            });
        }));
    /** END LOCAL SIGNUP **/

    /** LOCAL LOGIN **/
    /*passport.use('local-login', new LocalStrategy({
            usernameField: 'mail',
            passwordField: 'passwd',
            passReqToCallback: true
        },
        function (req, mail, passwd, done) {
            User.findOne({'local.mail': mail}, function (err, user) {
                /** if  errors, return error
                if (err)
                    return done(err);
                /** if no user is found
                if (!user) {
                    console.log('User Not Found with mail ' + mail);
                    return done(null, false);
                }

                /** if user found but wrong passwd
                if (!user.validPassword(passwd)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }
                console.log('User login succesful');
                /** return successful user *
                return done(null, user);
            });

        }));*/
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