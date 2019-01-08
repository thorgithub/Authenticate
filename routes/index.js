const router = require('express').Router();
const {ensureAuthenticated} = require('./../config/ensureAuthen')

router.get('/',(req,res)=>res.render('index'));


router.get('/dashboard',ensureAuthenticated,(req,res)=>
    res.render('dashboard',{
        name:req.user.name}
));

module.exports = router;  