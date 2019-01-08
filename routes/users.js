const router = require('express').Router();
const User =  require('./../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login',(req,res)=>{
    // res.send('login..');
    res.render('login');
})


router.get('/register',(req,res)=>{
    // res.send('register..');
    res.render('register')
})

router.post('/register',(req,res)=>{
    const {name, email , password , password2 } = req.body;
    let  errors = [];

    if(!name || !email || !password || !password2 ){
        errors.push({msg:'All fields required..'})
    }
    if(password !== password2){
        errors.push({msg:'Password doesnot match..'})
    }
    if(password.length <6){
        errors.push({msg:'Password must be greater than 6 character'})
    }

    if(errors.length > 0 ){
        res.render('register',{
            errors,name,email,password
        })
        // new User({name,email,password})
    }
    else{
        User.findOne({email}).then((user)=>{
            if(user){
                errors.push({msg:'Email id alredy exists...'})
                res.render('register',{
                    errors,name,email,password
                })
            }
            else{

                const newUser = new User({name,email,password});
                console.log(newUser);
                

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                       if(err) throw err;

                        console.log('Password hashed...',hash);
                       
                        newUser.password = hash;
                       
                        newUser.save()
                        .then((user)=>{
                            req.flash('success_msg','You are successfully registered and can login')
                            res.redirect('/users/login')
                        })   
                        .catch(err => console.log(err));        
                    })     
                })
                // res.send('finally registered...');
            }
        })

    }
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local', {
        successRedirect: '/dashboard', 
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next)
    // res.send('ok.done..');
});

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','you have successfully logged out!');
    res.redirect('/users/login')
})



module.exports = router;