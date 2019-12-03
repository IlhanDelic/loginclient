const localStrategy = require('passport-local').Strategy;

function initialize(passport) {
    passport.use(new localStrategy({usernameField: 'email'}))
}