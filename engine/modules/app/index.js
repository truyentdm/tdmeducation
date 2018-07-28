class App{
	instance(app){
		App.instance = app;
	}
	static getInstance(){
		if(App.instance != undefined || App.instance != null){
			return App.instance;
		}else{
			const express = require("express");
			App.instance = express();
		}
	}
}
module.exports.App = App;