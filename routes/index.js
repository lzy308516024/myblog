let express = require('express')
let { Article } = require('../model')


// 调用Router方法可以得到一个路由中间件的实例
let router = express.Router()

router.get('/',function(req,res){
  let {keyword,pageNum,pageSize} = req.query;
  pageNum = isNaN(pageNum)?1:parseInt(pageNum);
  pageSize = isNaN(pageSize)?3:parseInt(pageSize)
  
  let query = {};
  console.log(keyword)
  if(keyword){
    query['$or'] = [{
      title:new RegExp(keyword)
    },{content:new RegExp(keyword)}]
    // query.title = new RegExp(keyword)
  }
  console.log(query)

  // populate可以把一个字段从字符串转成对象
  Article.count(query,function(err,count){
    Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
      if(err){console.log(err)}
      console.log(articles)
      res.render('index',{title:'首页',keyword,pageNum,pageSize,totalPages:Math.ceil(count/pageSize),articles})
    })
  })
  
});

module.exports = router