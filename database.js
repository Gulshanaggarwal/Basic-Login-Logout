
const express=require('express');

const mongoose = require('mongoose');
const MONGODB_URI='<Your MongoDb Url>';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are ready with mongodb');
});

const store = new mongoose.Schema({
    userName:String,
    userEmail:String,
    userPass:String
  });

const item=mongoose.model('item',store);

module.exports=item;