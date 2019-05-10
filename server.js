const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'nawst',
    password : '',
    database : 'smart-brain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => res.send(database.users));

// app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));  
app.post('/signin', signin.handleSignin(db, bcrypt));  // Optional syntax, debatedly cl

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfile(req, res));

app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));



app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/*
/ --> GET = gets all users
/signin --> POST = success/fail match user against database
/register --> POST = adds user to database
/profile/:userId --> GET = gets specific user based on id
/image --> PUT --> user's entries count + 1
*/