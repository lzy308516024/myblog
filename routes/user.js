let express = require('express')
let { User } = require('../model')
let multer = require('multer')
let uploads = multer({dest:"public/uploads"})

let { checkLogin, checkNotLogin} = require('../auth')
let router = express.Router()

// 用户注册

/**
 *  注册功能如何实现
 *  1.绘制注册页面模板
 *  2.实现提交用户注册路由
 *  3.在路由中获得请求体，然后把此用户信息保存到数据库中
 *  4.保存完毕后跳转到登录页
 * 
 */
router.get('/signin',checkNotLogin,function(req,res){
  res.render('user/signin',{title:"注册"})
})
router.post('/signin',checkNotLogin,uploads.single('avatar'),function(req,res){
  console.log(req.file)
  let user = req.body;
  console.log(user)
  user.avatar = `/uploads/${req.file.filename}`
  User.create(user,function(err,doc){
    if(err){
      req.flash('error','用户注册失败');
      res.redirect('back')
    }else{
      req.flash('success','用户注册成功')
      res.redirect('/user/signup')
    }
  })
})
router.get('/signup',checkNotLogin,function(req,res){
  res.render('user/signup',{title:"登录"})
})
router.post('/signup',checkNotLogin,function(req,res){
  let user = req.body
  console.log(user,'here')
  User.findOne(user,function(err,doc){
    
    if(err){
      req.flash('error','数据库操作失败')
      console.log(err,'出错了')
      res.redirect('back')
    }else{
      if(doc){
        // 向会话对象中写入属性
        req.flash('success','用户登录成功')
        req.session.user = doc;
        res.redirect('/')
      }else{
        req.flash('error','用户名或密码不正确')
        res.redirect('back')
      }
    }
  })
})


router.get('/signout',checkLogin, function(req,res){
  req.session.user = null;
  res.redirect('/')
})
module.exports = router