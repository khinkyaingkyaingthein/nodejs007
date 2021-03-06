var express = require('express');
var router = express.Router();
var Post = require('../model/post');
var User = require('../model/user');

router.get('/', function(req, res, next) {
  res.send("I am post");
});

router.get('/addpost',function(req,res,next){
  User.find(function(err,rtn){
    if(err) throw err;
    res.render('post/add-post',{users:rtn});
  })

})

router.post('/addpost',function(req,res,next){
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/posts/listpost');
  })
})
router.get('/listpost',function(req,res,next){
  Post.find({}).populate('author').exec(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('post/list-post',{posts:rtn});
  })
})
router.get('/detailpost/:id',function (req,res,next){
  console.log(req.params.id);
  Post.findById(req.params.id).populate('author').exec(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.render('post/detail-post',{post:rtn});
  })
})
router.get('/updatepost/:uid',function(req,res,next){
  Post.findById(req.params.uid,function(err,rtn){
    if(err) throw err;
    User.find(function(err2,rtn2){
      if(err2) throw err2;
      console.log(rtn);
      res.render('post/update-post',{post:rtn,users:rtn2});
    })
  })
})

router.post('/updatepost',function(req,res,next){
  var update={
    title:req.body.title,
    content:req.body.content,
    author:req.body.author
  };
  Post.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/posts/listpost');
  })
})
router.get('/deletepost/:id',function(req,res){
  Post.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err) throw err;
    res.redirect('/posts/listpost');
  })
})
module.exports = router;
