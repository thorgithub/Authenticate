const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('./../models/User');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  }); 
   

passport.use(new GoogleStrategy({
    clientID :keys.google.clientID,
    clientSecret:keys.google.clientsecret,
    callbackURL:keys.google.url
},function(accessToken,refreshToken,profile,cb){
        console.log('user h ye....',profile);              
    User.findOne({ googleId: profile.id }, function (err, user) {
        // console.log('user h ye....',profile);              
          
    }).then((user)=>{
        console.log(profile.emails);   
        if(!user){
            const newUser = new User({
                name:profile.displayName  
                // email:user.email,
                // password:user.password
        
            })

            console.log(newUser,'AAAAAA gya....');
            
        }
        else {
            console.log('bhaiya chhooote lagaan...');
        }

    })   
}


));



// module.exports = passport;
