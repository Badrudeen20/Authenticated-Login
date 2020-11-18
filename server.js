if(process.env.NODE_ENV !== 'production'){
       require('dotenv').config()
}
const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const {initprocess} = require('./controller/passport');
const {Authenticate} = require('./checkAuthenticate/Authenticate');
const {NotAuthenticate} = require('./checkAuthenticate/NotAuthenticate');
initprocess(passport,
      function(email){
             return user.find(user => user.email === email)
      },
     function id(id){
            return user.find(user => user.id === id)
        }
      )

      app.use(flash());
      app.use(session({
             secret:process.env.SECRET_KEY,
             resave:false,
             saveUninitialized:false
      }))
      app.use(passport.initialize());
      app.use(passport.session());
      
      var user = [];
app.use(express.static(__dirname +'/css'));
app.set('views',__dirname +'/views');
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/', Authenticate, (req,res)=>{
       res.render('home');
})

app.get('/login',NotAuthenticate,(req,res)=>{
      res.render('login');
})

app.get('/register',NotAuthenticate,(req,res)=>{
      res.render('register');
})
 //storage
 app.post('/login',passport.authenticate('local',{
      successRedirect:'/',
      failureRedirect:'/login',
      failureFlash:true
}))

app.post('/register',async function(req,res){
       try{
       const hashpass = await bcrypt.hash(req.body.password,10);
       user.push({
              id:Date.now().toString(),
              name:req.body.name,
              email:req.body.email,
              password:hashpass
       })

       res.redirect('/login');
      } catch {
             res.redirect('/register');
      }
})
//logout
app.use('/auth',require('./route/auth'));

 app.listen(port,(err)=>{
        if(err) throw err
        console.log(`localhost:${port}`);
 })