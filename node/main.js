const http = require("http")
const express = require("express")
const bodyparser = require("body-parser")
const router = require("./router/login")

const app = express()
app.use(bodyparser.urlencoded({
    extended:false,
}))
app.use("/index",router)
app.listen(8002,function(){
    console.log("servering is runing at 8002 port");
})
