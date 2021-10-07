const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const key = require('./models/key');
const passport = require('passport');

const profilePath = require('./routes/profile-routes')
const authPath = require('./routes/auth-routes');
const User = require('./models/user-models');


//Connecting database
const connection = mongoose.connect('mongodb://azam:Myname@123@cluster0.ybdh1.mongodb.net/myFirstDatabase', {
    useNewUrlParser: true, useUnifiedTopology: true });
  if(connection){
  console.log("database connected");
  }
  else{
  console.log("database connection error");
  }
require('./config')(passport);

app.post('/regis', async(req, res) => {
    try {
    const user = await User.create({
        email: 'cac@email.com',
        password: '2124',
        firstname: 'asda',
        lastname: 'qweq'
    })
    

    res.send(user)
    } catch(er) {
        console.log(er)
    }
})

app.use(bodyParser.json())
app.use(passport.initialize());

app.use('/',profilePath)
app.use('/auth',authPath)



app.listen(3000,()=>{
    console.log('Server is running on port: 3000')
})