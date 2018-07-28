const { Base } = require("../base")
const { Log } = require("../log")

class Model{
	constructor(){
		this.base = Base.getInstance();
		this.debug = Log.getInstance();
	}
	getMapping(mapping){
		let str = null;
		if(typeof mapping === 'string'){
			str = mapping.slice(0,mapping.lastIndexOf('.'));
			str = str.replace(/>/gi, "/");
			str = str + '.js';
		}
		return str;
	}
	getAction(mapping){
		let start = null;
		let func = null;
		if(typeof mapping === 'string'){
			start = mapping.lastIndexOf('.');
		}
		if(start != null){
			func = mapping.slice(Number(start+1));
		}
		return func;
	}
}

module.exports.Model = Model