let express = require('express')
let { checkLogin, checkNotLogin} = require('../auth')
let router = express.Router()
let { Aricle, Article } = require('../model')
router.get('/add',checkLogin,function(req,res){
  res.render('article/add',{title:"发表文章",article:{}})
})
router.post('/add',checkLogin,function(req,res){
  let article = req.body // (body是bodyparser提供属性)
  article.user = req.session.user._id;
  Article.create(article,function(err,doc){
    if(err){
      req.flash('error',err)
      res.redirect('back')
    }else{
      req.flash('success','文章发表成功')
      res.redirect('/')
    }
  })
})

router.get('/detail/:_id',function(req,res){
  let _id = req.params._id
  Article.findById(_id,function(err,article){
    if(err){
      req.flash('error',err)
    }else{
      res.render('article/detail',{title:'文章详情',article})
    }
  })
})

router.get('/delete/:_id',function(req,res){
  let _id = req.params._id
  Article.remove({_id},function(err,result){
    if(err){
      req.flash('error',err)
      res.redirect('back')
    }else{
      req.flash('success','删除成功')
      res.redirect('/')
    }
  })
})
// 当点击更新按钮的时候会请求此路由路径
router.get('/update/:_id',function(req,res){

  let _id = req.params._id;

  Article.findById(_id,function(err,article){

    res.render('article/add',{title:'更新文章',article})
  })
})

router.post('/update/:_id',function(req,res){
  let _id = req.params._id;
  console.log(_id)
  Article.updateOne({_id},req.body,function(err,article){
    if(err){
      req.flash('error',err);
      res.redirect('back')
    }else{
      req.flash('success','文章更新成功')
      res.redirect('/article/detail/'+_id)
    }
  })
})

module.exports = router