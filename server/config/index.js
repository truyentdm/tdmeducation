const path = require("path")
const CONST = require("../constants")
const config = {
	server: {
		map: {
			path: "alias",
			mapping: "mapping",
			method: "method"
		},
		route: {
			"alias" : "string",
			"mapping" : "string",
			"method" : "get"
		}
	},
	views: {
		local: {
			"url" 	: "index.html",
			"error" : ""
		},
		route: {
			"alias" : "string",
			"mapping" : { "main":"string"},
			"exact" : false
		}
	},
	database: {
		use: "mongodb", // string or function
		alias: "mongodb",
		config: {url: "mongodb://root:123456@ds255797.mlab.com:55797/tdm_database",database: "tdm_database"} // MySQL : {hostname:'',username: '', password: '', database: ''} //mongodb://127.0.0.1:27017/  englishstd
	},
	option: {
		port_local: 8080,
		unicode: "utf-8" //socketIO: {enable: true}
	}
}
module.exports.config = config;