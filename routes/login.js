const express=require('express');
const router=express.Router();
const item=require('../database');
var session=require('express-session');
const { response } = require('express');
const bcrypt=require('bcrypt');

router.get('/login',(req,res)=>{
    res.render('login');
});
router.post('/login',(req,res)=>{
    let userEmail=req.body.email;
    let userPass=req.body.password;

    item.find({userEmail:userEmail},(err,docs)=>{
        if(err){
            res.render('login',{message:'Error occurred!'});
        }
        else{
            if(docs.length>0){
               let check= bcrypt.compareSync(userPass, docs[0].userPass);
               if(check){
                req.session.loggedinUser= true;
                req.session.userEmail= userEmail;
                   res.redirect('/dashboard');
               }
               else{
                   res.render('login',{message:"Wrong credentials!!"});
               }
            }
            else{
                res.render('login',{message:"No such user exists!"});
            }
           
        }
    })
});
module.exports = router;