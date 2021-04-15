const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
var session=require('express-session');
// routing 
const loginRouter=require('./routes/login');
const registerRouter=require('./routes/registration');
const dashboardRouter=require('./routes/dashboard');
const logoutRouter=require('./routes/logout');



app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    
}));

app.set('view engine','pug');
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));

app.use('/',loginRouter);
app.use('/',registerRouter);
app.use('/',dashboardRouter);
app.use('/',logoutRouter);



app.listen(80,()=>{
    console.log("we are ready with server");
})

