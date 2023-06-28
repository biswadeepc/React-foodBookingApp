const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const { validatePassword } = require('../utils/passwordUtils');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback = (username, password, done) => {
    User.findOne({ email: username })
        .then((user) => {
            if (!user) { return done(null, false) }
            const isValid = validatePassword(password, user.password, user.salt);
            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});