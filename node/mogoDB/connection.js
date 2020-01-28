const mongolass = require("mongolass")

const urls = {
    ip:"127.0.0.1",
    port:27017,
    user:"admin",
    password:"123456"
}

module.exports = function connectionMogo(dbName){
    return new mongolass(`mongodb://${urls.ip}:${urls.port}`,{
    authSource:"admin",
    auth:{
        user:urls.user,
        password:urls.password
    },
    dbName:dbName  
    })
}

