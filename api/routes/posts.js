var express = require('express');
var router = express.Router();
var User = require('../../model/user');
var Post = require('../../model/post');
var bcrypt = require('bcryptjs');

router.get('/list',function(req,res){
  Post.find({}).populate('author').exec(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        posts:rtn
      });
    }
  })
})

router.post('/add',function(req,res){
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.save(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(201).json({
        message:"User Account Created !!!",
        post:rtn
      })
    }
  })
})

router.get('/:id',function(req,res){
  Post.findById(req.params.id).populate('author').exec(function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        message:"Post Detail !!!",
        post:rtn
      })
    }
  })
})

router.patch('/:id',function(req,res){
  var update = {};
  for (var upd of req.body){
    update[upd.proName] = upd.proValue;
  }
  Post.findByIdAndUpdate(req.params.id,{$set:update},function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else {
      res.status(200).json({
        message:"User Update Account",
      })
    }
  })
})

router.delete('/:id',function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err){
      res.status(500).json({
        message:"Internal Server Error",
        error:err
      })
    }else{
      res.status(200).json({
        message:"User Account Deleted"
      })
    }
  })
})

module.exports = router;
