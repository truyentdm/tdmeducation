const path = require("path")

const ROOT = path.join(__dirname,"../../");
const ENGINE = path.join(__dirname,"../");
const SERVER = path.join(__dirname,"../../server");
const VIEWS = path.join(__dirname,"../../views");
const {config} = require(path.resolve(SERVER,"config"))

module.exports.ROOT 	= 	ROOT
module.exports.ENGINE 	= 	ENGINE
module.exports.SERVER 	= 	SERVER
module.exports.VIEWS 	= 	VIEWS

///////////////////////////////////////////
//			    CONFIG 					//
/////////////////////////////////////////
module.exports.CONFIG_ROUTE_SERVER  		= config.server;
module.exports.CONFIG_ROUTE_SERVICE 		= config.views;
module.exports.CONFIG_PORT_LOCAL			= config.option.port_local;
module.exports.CONFIG_UNICODE				= config.option.unicode;
module.exports.SYSTEM_SERVER_MAPPING 		= config.server.map.mapping;
module.exports.SYSTEM_SERVER_PATH	 		= config.server.map.path;
module.exports.SYSTEM_SERVER_METHOD	 		= config.server.map.method;
module.exports.SYSTEM_SERVICE_LOCAL_URL		= config.views.local.url;
module.exports.SYSTEM_CONFIG_DATABASE_USE	= config.database.use;
module.exports.SYSTEM_CONFIG_DATABASE_ALIAS	= config.database.alias;
module.exports.SYSTEM_CONFIG_DATABASE_CONFIG= config.database.config;
module.exports.SYSTEM_VIEWS_METHOD	 		= config.server.route.method;
module.exports.SYSTEM_ROUTER_PATH	 		= "path";
///////////////////////////////////////
//			HARD CODE				//
/////////////////////////////////////

module.exports.SERVER_ROUTE_DATA  				= "const routers = " + "*" + ";" + "module.exports.routes = routers;";
module.exports.SERVICE_ROUTE_DATA  				= "const routers = " + "*" + ";" + "exports default routes;";
module.exports.ROOT_ROUTE_JSON  				= path.resolve(ROOT,"routes/web.json");
module.exports.ROOT_ROUTE_XML  				= path.resolve(ROOT,"routes/web.xml");
module.exports.ENGINE_ROUTE_SERVER  			= path.resolve(ENGINE,"modules/route/server.js");
module.exports.ENGINE_ROUTE_SERVICE 			= path.resolve(VIEWS,"src/Routers.js");
module.exports.SYSTEM_SERVICE_LOCAL_URL_PATH	= path.join(VIEWS,config.views.local.url);