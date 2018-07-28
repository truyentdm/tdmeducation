const { Route } = require("./modules/route")
const { Control } = require("./modules/control")
const { Controller } = require("./modules/control/controller")
const { DriverDB } = require("./modules/model/DriverDB")
const { Router } = require("./modules/control/route")
const { App } = require("./modules/app")
const { Log } = require("./modules/log")
const CONFIG = require("./constants/index")

class Engine{
	static initialize(){
		if(Engine.instance != undefined || Engine.instance != null){
			return Engine.instance;
		}else{
			Engine.instance = new Engine();
			return Engine.instance;
		}
	}
	use(control = "",auto){
		if(control == "app"){
			new App().instance(auto)
		}
	}
	passport(feelback){
		App.getInstance().use((req,res,next)=>{
			req.isAuthenticated = ()=>{
				return feelback(req,res);
			}
			next();
		});
	}
	route(){
		Route.getInstance().initialize()
		.then(result=>{
			if(result == true){
				console.log(Route.getInstance().pathServer)
				Route.getInstance().getDataRouterServer(Route.getInstance().pathServer,data=>{
					if(data === ""){
						Log.getInstance().log("[ENG][engine]","Error Data Router")
					}else{
						Log.getInstance().log("[ENG][engine]",data)
						Control.getInstance().route(data);
					}
				})
			}
		})
	}
	
}

module.exports.Controller = Controller;
module.exports.Model = DriverDB;
module.exports.Router = Router
module.exports.Engine = Engine;

