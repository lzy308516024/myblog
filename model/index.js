let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
// 连接数据库
mongoose.connect(require('../config').dbUrl,{ useUnifiedTopology: true,useNewUrlParser: true});


// 定义用户集合的骨架模型，规定了用户集合中文档的属性和类型
let UserSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  avatar:String
})

// 定义用户模型
let User = mongoose.model('User',UserSchema)
// 把用户模型挂载到导出对象上
exports.User = User;

let ArticleSchema = new mongoose.Schema({
  title:String,
  content:String,
  createAt:{ type:Date, default:Date.now },
  // user 是一个外键,引用的是另外一个表的主键
  user:{ type:ObjectId, ref:'User'} // 作者，引用的是用户表的主键
})
let Article = mongoose.model('Article',ArticleSchema)
exports.Article = Article;