const path = require("path")
const { Model } = require("./model")
const { App } = require("../app")
const CONFIG = require("../../constants");

class Control extends Model{
	constructor(){
		super();
		this.app = App.getInstance();
	}
	static getInstance(){
		if(Control.instance != undefined || Control.instance != null){
			return Control.instance;
		}else{
			Control.instance = new Control();
			return Control.instance;
		}
	}
	route(data){
		this.debug.log("[ENG][Control]","route")
		data.forEach(item=>{
			this.createRouter(item,(req,res)=>{
				this.loadAction(item[CONFIG.SYSTEM_SERVER_MAPPING],{req,res})
			})
		})
	}
	createRouter(data,callback){
		const path = this.base.existsKeyInArray(data,CONFIG.SYSTEM_SERVER_PATH) ? data[CONFIG.SYSTEM_SERVER_PATH] : "";
		const method = this.base.existsKeyInArray(data,CONFIG.SYSTEM_SERVER_METHOD) ? data[CONFIG.SYSTEM_SERVER_METHOD] : (CONFIG.SYSTEM_SERVER_METHOD != "string" ? CONFIG.SYSTEM_SERVER_METHOD : "GET" );
		if(path !== ''){
			if(method.toUpperCase() === 'GET'){
				this.debug.log("[ENG][SYS]","METHOD GET >>",path)
				this.app.get(path,callback);
			}
			if(method.toUpperCase() === 'POST'){
				this.app.post(path,callback);
			}
		}
	}
	loadAction(mapping,handler){
		if(mapping != 'SERVICE'){
			const pathFile = this.getMapping(mapping);
			this.base.existsFile(path.join(CONFIG.ROOT,pathFile),(res,pathRes)=>{
				if(!res){
					handler.res.sendFile("Not Found File. SERVER");
				}else{
					const loadClass = require(pathRes)
					const nameClass = Object.keys(loadClass)[0];
					const createClass = new loadClass[nameClass](handler);
					if(typeof createClass.initVariant == "function"){
						createClass.initVariant(handler)
					}
					const action = this.getAction(mapping);
					createClass[action]()
				}
			});
		}else if( mapping == 'SERVICE'){
			console.log(">>>>>>>> SERVICE")
			if(typeof CONFIG.SYSTEM_SERVICE_LOCAL_URL != undefined){
				this.base.existsFile(CONFIG.SYSTEM_SERVICE_LOCAL_URL_PATH,(res,pathRes)=>{
					if(!res){
						handler.res.sendFile("Not Found File. SERVICE");
					}else{
						handler.res.sendFile(pathRes);
					}
				})
			}
		}else{
			handler.res.sendFile("Exits Mapping JSON");
		}
	}
}
module.exports.Control = Control;