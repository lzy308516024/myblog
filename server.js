let express = require('express')

let app = express()
let index = require('./routes/index');
let user = require('./routes/user')
let article = require('./routes/article')


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
