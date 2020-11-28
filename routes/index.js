let express = require('express')

// 调用Router方法可以得到一个路由中间件的实例
let router = express.Router()

router.get('/',function(req,res){
  res.send('首页')
});

module.exports = router