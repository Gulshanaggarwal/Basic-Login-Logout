const express=require('express');
const router=express.Router();
const item=require('../database');
const nodemailer=require('nodemailer');
const bcrypt=require('bcrypt');

let userName,userEmail,userPass;
let otp;


router.get('/register',(req,res)=>{
    res.render('registration');
});
router.post('/register/send',(req,res)=>{
    userName=req.body.name;
    userEmail=req.body.email;
    userPass=req.body.password;


    item.find({userEmail:userEmail},(err,docs)=>{
      if(err){
        res.render('registration',{message:'Error occurred! try again'})
      }
      else{
        if(docs.length>0){
          res.render('registration',{message:'User already exist with given email address!'})
        }
        else{
          otp = Math.random();
          otp = otp * 1000000;
          otp = parseInt(otp);
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: '',
              pass: ''
            }
          });
          
          var mailOptions = {
            from: '',
            to: userEmail,
            subject: 'Otp',
            html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
            res.render('otp');
          });
        }
      }
    })

    


});

router.post('/register/verify',(req,res)=>{
    if(req.body.otp==otp){
      const saltrounds = 10;
      let hashedPass=bcrypt.hashSync(userPass, saltrounds);
        let data=new item({
            userName:userName,
            userEmail:userEmail,
            userPass:hashedPass
        });
        data.save();
        res.render('registration',{message:"You are successfully registered ! Login to enjoy free services",});
    }
    else{
        res.render('otp',{flash:"incorrect OTP try again or resend!"});
    }
});
router.post('/register/resend',(req,res)=>{
  otp=Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '',
          pass: ''
        }
      });
      
      var mailOptions = {
        from: '',
        to: userEmail,
        subject: 'Otp',
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        res.render('otp',{flash:'OTP has been sent again! successfully'});
      });
})

module.exports = router;