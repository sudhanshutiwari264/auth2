const express = require('express');
const app = express();

const userModel = require(`./models/user`) 

const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const { emitWarning } = require('process');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req, res)=>{
  res.render('index');
});

app.post('/create', (req, res)=>{
  let {username, email, password, age} = req.body;
  
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async (err,hash)=>{
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age
      });

      let token = jwt.sign({email},'shhhhhhhhhhhhh');
      res.cookie('token',token);
      res.send(createdUser);
    });
  });
});

app.get('/login', function(req, res){
  res.render(`login`)
});

app.post('/login',async function(req,res){
  let user = await userModel.findOne({email:req.body.email})
  if(!user) return res.send('something  went wrong')
  
  bcrypt.compare(req.body.password, user.password,(err,result)=>{
    if(result){
      let token = jwt.sign({email: user.email},'shhhhhhhhhhhhh');
      res.cookie('token',token);
      res.send(`You can login`)
    } 
    else res.send('something  went wrong')
  })
});

app.get('/logout', function(req, res){
  res.cookie('token','')
  res.redirect('/')
})

app.listen(3000);