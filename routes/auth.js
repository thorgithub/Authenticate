const router = require('express').Router();
const User =  require('./../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/google',
     passport.authenticate('google',{ scope: ['profile'] })  
    );
    
    // console.log('Profile...');

router.get('/google/redirect',
    passport.authenticate('google',{failureRedirect:'/users/login'}),
    function(req,res){
    console.log('redirecting pr h...');    
    res.redirect('/',{name:req.user.name})        
    console.log('redirected...');    
});  
 

module.exports = router;