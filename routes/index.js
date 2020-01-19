var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Admin = require('../model/Admin');
var validator = require('email-validator');
var passwordValidator = require('password-validator');

var schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-TBS',user:(req.session.user == undefined)?{name:'unknow',email:'unknow'}:req.session.user});
});

router.get('/home',function(req,res,next){
  res.render('home', {title: 'Welcome from Computer University Pyay'});
});

router.get('/signup',function(req,res,next){
  res.render('user/sign-up');
});
router.post('/signup',function(req,res,next){
  var admin = new Admin();
  admin.name = req.body.name;
  admin.email = req.body.email;
  admin.password = req.body.pwd;
  admin.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('user/sign-in');
  })

})
router.get('/signin',function(req,res,next){
  res.render('user/sign-in');
})
router.post('/signin',function(req,res,next){
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    if(rtn != null && Admin.compare(req.body.pwd,rtn.password)){
      req.session.user={name:rtn.name,email:rtn.email};
      res.redirect('/');
    }else{
      res.redirect('/signin');
    }
  })
})
router.get('/signout',function(req,res){
  req.session.destroy(function(err){
    if(err) throw err;
    res.redirect('/');
  })
})
router.post('/duemail',function(req,res){
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    if(rtn != null || !validator.validate(req.body.email)){
      res.json({status:true});
    }else{
      res.json({status:false});
    }
  })
})

router.post('/pwdval',function(req,res){
  res.json({status:schema.validate(req.body.password)});
})
module.exports = router;
