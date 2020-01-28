const electron = require("electron")

const {app, BrowserWindow } = require("electron") 
//使得node中的requrie和electron的分开

let win 
function creatView(){
    //设置窗口
     win = new BrowserWindow({
        width:1095,
        height:850,
        webPreferences:{
            nodeIntegration:true
        }
    })
    //读取文件
    win.loadFile("./Vews/login.html")
    //打开开发者工具
    win.webContents.openDevTools()
    win.on("close",()=>{
        win = null
    })
}


app.on('ready', creatView)

app.on("window-all-closed",()=>{
    if(process.platform !== "darwin"){
        app.quit()
    }
})
app.on("activate",()=>{
    if(win == null){
        creatView()
    }
})