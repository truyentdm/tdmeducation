const CONFIG = require("../../constants");
var MongoClient = require('mongodb').MongoClient;
const key_namespace = CONFIG.SYSTEM_CONFIG_DATABASE_ALIAS != "" || CONFIG.SYSTEM_CONFIG_DATABASE_ALIAS != undefined ? CONFIG.SYSTEM_CONFIG_DATABASE_ALIAS : "model"
const namespaceDB = {
    [key_namespace] : null
}
class DriverDB{
    constructor(){
        this.db = null;
    }
    connect(){
        return new Promise((resolve,reject)=>{
            if(typeof CONFIG.SYSTEM_CONFIG_DATABASE_USE == "function"){

            }else if(CONFIG.SYSTEM_CONFIG_DATABASE_USE.toLowerCase() == "mongodb"){
                console.log("Use Mongodb");
                this.mongoDBConnect(CONFIG.SYSTEM_CONFIG_DATABASE_CONFIG.url,(err,client)=>{
                    if(err){
                        return reject(new Error("Not connect DB"))
                    }else{
                        this.db = client;
                        namespaceDB[key_namespace] = client.db(CONFIG.SYSTEM_CONFIG_DATABASE_CONFIG.database);
                        return resolve(client);
                    }
                });
                console.log("End Connect Mongodb")
            }else if(CONFIG.SYSTEM_CONFIG_DATABASE_USE.toLowerCase() == "mysql"){
                console.log("Use MySQL")
            }else{
                console.log("Use function Connect DB or Mongodb,MySql")
            }
        });
    }
    close(){
        this.db.close();
        this.db = null;
        namespaceDB[key_namespace] = null;
        console.log("close DB")
    }
    collection(strCollection){
        namespaceDB[key_namespace] = namespaceDB[key_namespace].collection(strCollection)
    }
    clear(){
        namespaceDB[key_namespace] = this.db.db(CONFIG.SYSTEM_CONFIG_DATABASE_CONFIG.database);
    }
    mongoDBConnect(local,cb){
        MongoClient.connect(local,(err,client)=>{
            if(err){
                console.log("Not connect")
                cb(true,client);
            }else{
                console.log("Connect success MongoDB")
                cb(false,client);
            }
        })
    }
    mySQLConnect(){}
}
Object.setPrototypeOf(DriverDB.prototype,namespaceDB)
module.exports.DriverDB = DriverDB