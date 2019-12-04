const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport:any, getUserByEmail:any, getUserById:any ) {
   const authenticateUser = async (email: any , password: any, done: any) => {

       const user = getUserByEmail(email); // checks the users email
       if(user == null ){
           return done(null, false, {message: 'there are no users with that email'})  //return if there is no email
       }
    try {
        if (await bcrypt.compare(password, user.password)) {  //checks if the password matches
            return done(null, user)
        }

            else {
            return done(null, false, {message: 'password incorrect'})
        }

    } catch (e) {
       return done(e) // catches the error
    }
   };

    passport.use(new localStrategy(({ usernameField: 'email '}),
        authenticateUser) );

    passport.serializeUser((user:any, done:any) => {done(null, user.id)});
    passport.deserializeUser((user:any, done:any) => {
     return  done(null, getUserById(id))
    })
}
module.exports = initialize;