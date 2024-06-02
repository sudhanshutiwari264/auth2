const express = require('express');
const app = express();

const userModel = require(`./models/user`) 

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req, res)=>{
  res.render('index');
});

app.post('/create',async (req, res)=>{
  let {username, email, password, age} = req.body;
  console.log(username, email, password, age)
});

app.listen(3000);