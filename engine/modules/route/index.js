const fs = require("fs");
const path = require("path");
const CONFIG = require("../../constants");
const { Log } = require("../log");
const { Model } = require("./model")

class Route extends Model{
	constructor(){
		super();
		this.console = Log.getInstance();
		this.console.log("[Route]","CONSTRUCTOR")
		this.unicode 		= CONFIG.CONFIG_UNICODE;
		this.pathJson 		= CONFIG.ROOT_ROUTE_JSON;
		this.pathServer 	= CONFIG.ENGINE_ROUTE_SERVER;
		this.pathService 	= CONFIG.ENGINE_ROUTE_SERVICE;
		this.configService 	= CONFIG.CONFIG_ROUTE_SERVICE;
		this.configServer 	= CONFIG.CONFIG_ROUTE_SERVER;
	}
	static getInstance(){
		if(Route.instance != undefined || Route.instance != null){
			return Route.instance;
		}else{
			Route.instance = new Route();
			return Route.instance;
		}
	}
	/*@set - get*/
	setPathJson(_data){
		this.pathJson = _data;
	}
	setPathServer(_data){
		this.pathServer = _data;
	}
	setPathService(_data){
		this.pathService = _data;
	}
	setConfigService(_data){
		this.configService = _data;
	}
	setUniCode(_data){
		this.unicode = _data;
	}
	
	/*@public*/
	initialize(){
		this.readXML(CONFIG.ROOT_ROUTE_XML)
		return new Promise((resolve,reject)=>{
			this.readJSON(this.pathJson)
			.then(data=>{
				this.fillterData("SERVICE",data)
				.then(res=>{
					this.writeRouterService(CONFIG.SERVICE_ROUTE_DATA,res,this.pathService);
				})
				.catch(err=>{
					reject(err);
				})
				return this.fillterData("SERVER",data);
			})
			.then(res=>{
				resolve(this.writeRouterServer(CONFIG.SERVER_ROUTE_DATA,res,this.pathServer));
			})
			.catch(err=>{
				reject(err);
			})
		})
	}
	/*@private*/
	fillterData(strFillter,res){
		return new Promise((resolve,reject)=>{
			let objRes = JSON.parse(res);
			if(this.existsKeyInArray(objRes,'route')){
				const dataLength = Object.keys(objRes['route']).length;
				let data = null;
				if(strFillter == 'SERVICE'){
					data = [];
					//write router server
					const mapObject = Object.keys(this.configService.route);
					for(let i = 0;i<dataLength;i++){
						if(this.convertStringToObject(this.configService.route,objRes['route'][i])== ""){
							continue
						}else{
							data[i] = JSON.parse(this.convertStringToObject(this.configService.route,objRes['route'][i]));
						}
					}
					this.console.log("[ENG][ROUTERS]","data router service, done !")
				}else if(strFillter == 'SERVER'){
					data = {"server":[]};
					for(let i = 0;i<dataLength;i++){
						if(this.convertStringToObject(this.configServer.route,objRes['route'][i])== ""){
							continue
						}else{
							data["server"][i] = JSON.parse(this.convertStringToObject(this.configServer.route,objRes['route'][i]));
						}
					}
					this.console.log("[ENG][ROUTERS]","data router server, done !")
				}else{
					reject(new Error("Exists string fillter"));
				}
				resolve(data);
			}else{
				reject(new Error("Exists web.json"));
			}
		})
		
	}
}
module.exports.Route = Route;