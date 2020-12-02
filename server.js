let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let session = require('express-session')

let flash = require('connect-flash')
let MongoStore = require('connect-mongo')(session)

let app = express()
// 设置模板引擎
app.set('view engine','html')
// 指定模板的存放根目录
app.set('views',path.resolve('views'))

// 指定对于html类型的模板可以使用ejs方法来进行渲染
app.engine('html',require('ejs').__express)
// 解析客户端提交过来的请求体，并转成对象付给req.body
app.use(bodyParser.urlencoded({extended:true}))


app.use(express.static(path.resolve('node_modules/')))
app.use(express.static(path.resolve('public')))

// 在使用了此会话中间件之后，会在请求对象上增加req.session属性
app.use(session({
  resave:true,// 每次客户端请求到服务器都会保存session
  secret:'lzybig',
  cookie:{
    maxAge:3600*1000,//制定cookie的过期时间
  },
  saveUninitialized:true, // 保存初始化的session
  store:new MongoStore({
    url:require('./config').dbUrl
  })
}))
// 此中间件的使用要放在session的后面  因为此中间件的使用是依赖session的
app.use(flash())
let index = require('./routes/index');
let user = require('./routes/user')
let article = require('./routes/article')
app.use(function(req,res,next){
  // 真正渲染模板的是res.locals
  res.locals.user = req.session.user
  res.locals.keyword = '';
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next()
})


// 当客户端请求过来的卢靖姗 /user开头的话，会交由   中间件user来处理
app.use('/',index);
app.use('/user',user)
app.use('/article',article)


/**
 * / 首页
 * /user/signup 注册
 * /user/signin 登录
 * /user/signout 退出
 * /article/add 发表文章
 * 
 * 
 */

app.listen(8888)
