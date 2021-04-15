const express=require('express');
var router = express.Router();
var session=require('express-session');
/* GET users listing. */
router.get('/logout', function(req, res) {
  req.session.destroy(function (err) {
    res.redirect('/login'); 
   });

});
module.exports = router;