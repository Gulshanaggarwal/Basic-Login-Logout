var express = require('express');
var router = express.Router();
var session=require('express-session');
const { DocumentProvider } = require('mongoose');
const item=require('../database');
/* GET users listing. */
router.get('/dashboard', function(req, res, next) {
    if(req.session.loggedinUser){
        item.findOne({userEmail:req.session.userEmail},(err,docs)=>{
            res.render('dashboard',{message:docs.userName});
        })
    }else{
        res.redirect('/login');
    }
});
module.exports = router;