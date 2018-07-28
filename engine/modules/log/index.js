
class Log{
	constructor(css=" : "){
		this.style = css;
	}
	static getInstance(){
		if(Log.instance != undefined || Log.instance != null){
			return Log.instance;
		}else{
			Log.instance = new Log();
			return Log.instance;
		}
	}
	log(){
		let bin = "";
		for(let i = 0 ; i < arguments.length ; i++){
			bin += arguments[i]+this.style;
		}
		bin += new Date().toTimeString();
		console.log(bin);
	}
}

module.exports.Log = Log