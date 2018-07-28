const fs = require("fs")

class Base {
	static getInstance(){
		if(Base.instance != undefined || Base.instance != null){
			return Base.instance;
		}else{
			Base.instance = new Base();
			return Base.instance;
		}
	}
	existsFile(path,callback){
		fs.exists(path,(exists)=>{
			callback(exists,path);
		});
	}
	existsKeyInArray(array,key){
		return (key in array);
	}
	convertStringToObject(pattern,object,valueDefault="SERVICE"){
		let strObject = "";	
		let subKey = "";	
		let error = false;
		const keyPattern = Object.keys(pattern);
		for(let i=0;i<keyPattern.length;i++){
			if(subKey != ""){
				subKey += ',';
			}
			if(typeof pattern[keyPattern[i]] == 'string' 
				|| typeof pattern[keyPattern[i]] == 'boolean' 
				|| typeof pattern[keyPattern[i]] == 'number' 
				|| pattern[keyPattern[i]] == 'string'
			){
				if(pattern[keyPattern[i]] == "string" && object[keyPattern[i]] == 'undefined'){	
					error = true;
				}else{
					if(typeof pattern[keyPattern[i]] != 'string'){
						subKey += '"' + keyPattern[i] + '": ' + (typeof object[keyPattern[i]] != 'undefined' ? object[keyPattern[i]] : pattern[keyPattern[i]]);
					}else{
						//add20/3/2018
						if(typeof object[keyPattern[i]] == 'object'){
							subKey += '"' + keyPattern[i] + '":"'+valueDefault+'"';
						}else{
							subKey += '"' + keyPattern[i] + '":"' + (typeof object[keyPattern[i]] != 'undefined' ? object[keyPattern[i]] : pattern[keyPattern[i]]) + '"';
						}
					}
				}
			}else if(typeof pattern[keyPattern[i]] == 'object' && typeof object[keyPattern[i]] == 'object'){
				let subObject = this.convertStringToObject(pattern[keyPattern[i]],object[keyPattern[i]]);
				if(subObject != ""){
					subKey += '"' + keyPattern[i] + '":' + subObject + '';
				}else{
					error = true;
				}
			}else{
				error = true;
			}
		}
		if(!error){
			strObject = '{'+subKey+'}';
		}
	   return strObject;
	}
}

module.exports.Base = Base;