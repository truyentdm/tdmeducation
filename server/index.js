const CONST = require("./constants")
const fs = require("fs")
const path = require("path")
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const CONFIG = require("./config")
const { Engine } = require("../engine")

const userRouter = require('../routes/user');
const homeRouter = require('../routes/home');
const gameRouter = require('../routes/games');
const adminRouter = require('../routes/admin');
const advRouter = require('../routes/adv');

const engine = Engine.initialize();


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: "secret"
}))

		
app.set("view engine","html");
app.set("views",path.join("../views"))
app.engine("html",function(path,option,callback){
	fs.readFile(path,"UTF-8",callback)
})
app.use(express.static(path.join(CONST.VIEWS,"public")))
app.use((req,res,next)=>{
	res.success = (data,message="success")=>{
		res.json({data: data,message: message, error: false})
	}
	res.error = (message="error")=>{
		res.json({data: null,message: message, error: true})
	}
	next();
});
engine.use("app",app);
engine.passport((req,res)=>{
	if(req.session.user == undefined || req.session.user == null || req.session.user == ""){
		if(req.cookies.user == undefined || req.cookies.user == null || req.cookies.user == ""){
			return false;
		}else{
			// Must so sanh id and user in DB
			console.log(">>>>>>>>>>>>>>> COOKIE")
			req.session.user = req.cookies.user;
			return true;
		}
	}else{
		return true;
	}
})

// engine.route();
app.use("/user",userRouter);
app.use("/",homeRouter);
app.use("/english",gameRouter);
app.use("/panel",adminRouter);
app.use("/adv",advRouter);

app.listen(process.env.PORT || 8080 )