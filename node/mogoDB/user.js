const mongolass = require("mongolass")

const connectmogo = require("./connection")
const schema = mongolass.Schema
const  userSchema = new schema("userSchema",{
    username:{type:"string",required:true},
    password:{type:"string",required:true},
    age:{type:"number",required:true},
    sex:{type:"string",required:true},
    email:{type:"string",required:true},
    ism:{type:"boolean",defalut:false,required:true},
})

//promise报错具体位置
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

 const mongo = connectmogo("userinfo")
 const user = new mongolass.Model("userinfo",userSchema,mongo,{
     collName:"userinfo"
 })
//测试
// user.insertOne({
//      username:"admin",
//      password:"admin",
//      age:18,
//      sex:"女",
//      email:"112466@qq.com",
//      ism:true
//  }).exec().then(console.log).catch(console.error())
module.exports = {
    user
}


