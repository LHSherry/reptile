const express = require("express")
const {user} = require("../mogoDB/user")
const session = require("express-session");
const mongoStore = require("connect-mongo")(session)
const {news} = require("./dataHandle/request")
const router = express.Router()
router.use(session({
    secret: '12345',
    name: 'restile',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    // cookie: {maxAge: 1000*60 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:1000*60*60},
    rolling: true, 
    store: new mongoStore({//转存mongodb数据库实现数据持久化
        url:"mongodb://admin:123456@localhost:27017/cookie?authSource=admin",
        ttl: 1000*60, 
    })
}))
router.post("/login",async (req,res)=>{
    if(req.body){
        const {username,password} = req.body
        if(username.indexOf("@") !== -1){//邮箱登录
            if( result && username == result.email && password == result.password){
                req.session.login = true
                req.session.username = username
                res.json({result:true})
            }else{
                res.json({result:false})
            }
        }
        const result = await user.findOne({username:username,password:password}).exec()//账号登录
        if( result && username == result.username && password == result.password){
            req.session.login = true
            req.session.username = username
            res.json({result:true})
        }else{
            res.json({result:false})
        }
    }else{
        res.json({result:false})
    }
})
router.post("/resgist",async (req,res)=>{
let {username,password,email,sex,age} = req.body
const result = await user.findOne({username:username}).exec()
if(result && result.username){
    res.json({result:false})
}else{
    await user.insertOne({
        username:username,
        password:password,
        age:+age,
        sex:sex,
        email:email,
        ism:true
        }).exec()
    res.json({result:true})
}
})
router.get("/",function(req,res,next){
    console.log(req);
    next()
})
router.get("/index",function(req,res){
    if(req.session.username){
      const  username = req.session.username
        res.json({result:true,data:{
                username
        }})
    }else{
        //重置cookie里面的属性
        req.session.cookie.maxAge = 0;
        //删除数据库里面的cookie
        req.session.destroy(function(){
            res.json({result:false})
        })

    }
})
router.get("/out",function(req,res){
    req.session.destroy(function(){
        res.json({result:"ok"})
    })

})
router.post("/getNews",async function(req,res){
    if(req.body){
        const {showfile,url} = req.body
         news(url).then((reslove)=>{
            res.json({result:reslove})
         }).catch((err)=>{
            res.json({result:false})
         })
    }else{
        res.json({result:false})
    }
})
module.exports = router