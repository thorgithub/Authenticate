const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const flash = require('connect-flash');
const session = require('express-session');
  
   
   
//passport config
require('./config/passport')(passport);
require('./config/passport-google')
  
var app = express();
var port = process.env.PORT || 3000 ; 
  
// ejs
app.set('view engine','ejs');   
  
// body parser 
app.use(express.urlencoded({extended:true})); 

// express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized : true 
}));  

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// global var  
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next(); 
})  

//connecting to db
mongoose.connect(keys.mongoURI,{useNewUrlParser: true})
    .then(()=>console.log('mongodb connected..'))  
    .catch((e)=>console.log(e))
// Routes   
app.use('/',indexRoutes); 
app.use('/users',usersRoutes);
app.use('/auth',authRoutes);

app.listen(port,()=>{
    console.log(`Server up on port: ${port}`)
})