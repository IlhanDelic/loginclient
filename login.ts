import express from 'express';
const app = express();
const bcrypt = require('bcrypt'); // allow to hash passwords and compare hashed passwords
const passport = require('passport'); // passport is used for authentication/ local is je just to use UN and PW to login
const initializePassport = require('./passport.config');
initializePassport(passport);
const users:any = []; // empty array for the userdata because we don't want to use a database yet


app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false})); // make sure you can access the data in the req instead of the post methode
//--------------------------------------------------------------------------- homepage

app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'ilhan' })});
//--------------------------------------------------------------------------- login
app.get('/login', (req, res) => {
    res.render('login.ejs');
});
//--------------------------------------------------------------------------- login post

app.post('/login', (req, res) => {
req.body.name
});
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
        password: hashedPassword // the hashed passedword
    });
    res.redirect('/login') // redirects to login page when a account is registered
} catch {
    res.redirect('/register') // if something fails you get redirected to the register page
}
console.log(users); // print the array of user data in the console
});
//--------------------------------------------------------------------------- listen to port 3000

app.listen(3000);
