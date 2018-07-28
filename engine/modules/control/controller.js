const CONFIG = require("../../constants");
const path = require("path")
class Controller{
	constructor(){
		console.log("[ENG][Controller]","Controller create");
		this.req = null;
		this.res = null;
	}
	initVariant(e){
		this.req = e.req;
		this.res = e.res;
	}
	send(variant){
		this.res.send(variant);
	}
	sendFile(pathFile){
		this.res.sendFile(path.join(CONFIG.VIEWS,pathFile));
	}
}
module.exports.Controller = Controller;