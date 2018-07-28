const fs = require("fs");
const { Base } = require("../base");
const xml2js = require('xml2js');
class Model extends Base{
	constructor(){
		super();
	}
	readJSON(path,unicode = "utf-8"){
		return new Promise((resolve,reject)=>{
			fs.readFile(path,unicode,(err,data)=>{
				if(err){
					reject(err);
				}else{
					resolve(data);
				}
			});
		});
	}
	readXML(path,unicode = "utf-8"){
		const parser = new xml2js.Parser();
		fs.readFile(path, function(err, data) {
			parser.parseString(data, function (err, result) {
				console.dir(JSON.stringify(result));
				console.log('Done >>>>>>>>>>>>>>>>>>>>>>>');
			});
		});
	}
	getDataRouterServer(pathServer,callback){
		const data = require(pathServer);
		if(typeof data.routes.server === "object"){
			callback(data.routes.server);
		}else{
			
			console.log(typeof data.routes.server)
			console.log("truyen")
			console.log(data)
			
			callback("");
		}
	}
	writeRouterServer(config,res,pathServer){ //CONFIG.SERVER_ROUTE_DATA
		const data = config.replace("*",JSON.stringify(res));
		return new Promise((resolve,reject)=>{
			fs.writeFile(pathServer,data,(err,res)=>{
				if(err) { 
					resolve(false)
				}else{
					resolve(true)
				}
			});
		})
	}
	writeRouterService(config,res,pathService){ //CONFIG.SERVICE_ROUTE_DATA
		const data = config.replace("*",JSON.stringify(res))
		fs.writeFile(pathService,data,(err,res)=>{
			if(err) { 
				console.log(err.toString())
			}
		});
	}
}
module.exports.Model = Model