//load in environment variables
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

import express from 'express';
const app = express();
const bcrypt = require('bcrypt'); // allow to hash passwords and compare hashed passwords
const passport = require('passport'); // passport is used for authentication/ local is je just to use UN and PW to login
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport.config');
initializePassport(passport, (email: any)=> {
    users.find(((user: any) => user.email === email ) , //finding the user based on email
        (id: any) => users.find((user: any) => user.id === id))
});
const users:any = []; // empty array for the user data because we don't want to use a database yet


app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false})); // make sure you can access the data in the req instead of the post methode
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET, // a key we want to keep secret
    resave: false, //dont save if nothing has changed
    saveUninitialized: false // do you want to save an empty value in the session and we dont want that
    }));
app.use(passport.initialize());
app.use(passport.session());
//--------------------------------------------------------------------------- homepage

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'ilhan' })});
//--------------------------------------------------------------------------- login
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
//--------------------------------------------------------------------------- login post

app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // go to the home page when you're successfully logged in
    failureRedirect: '/login', //if there is a failure then you stay at the login page
    failureFlash: true // let us have a flash message
}));
//--------------------------------------------------------------------------- register


app.get('/register', (req, res) => {
    res.render('register.ejs');
});
//--------------------------------------------------------------------------- register post

app.post('/register', async (req, res) => { // its an async function so you can use try catch
try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);  //make a hashes password, 10 default value quite quick and secure
    users.push({
        id: Date.now().toString(), //here i would put a token or the id used in the sphere
        name: req.body.name, // the name
        email: req.body.email, // the email
        password: hashedPassword // the hashed password
    });
    res.redirect('/login') // redirects to login page when a account is registered
} catch {
    res.redirect('/register') // if something fails you get redirected to the register page
}
console.log(users); // print the array of user data in the console
});
//--------------------------------------------------------------------------- listen to port 3000

app.listen(3000);
