const CONST = require(baseURL+"server/constants")
const path = require("path")
const { Controller } = require(baseURL+"engine")
const { GameModel } = require("../models/GameModel")

class Home extends Controller{
	constructor(){
		super()
		// this.log('[SER][home]','load constructor')
	}
	indexHome(){
		console.log("ACTION >>>>")
		// this.log('[SER][home]',"call home");
			// this.SocketIO.io.on("connection",(socket)=>{
				// console.log("login global")
				// this.SocketIO.io.sockets.emit("user-login","IO");
			// })
			// this.SocketIO.namespace("/my-namespace",(nsp)=>{
				// nsp.on('connection', (socket)=>{
					// console.log('someone connected');
					// socket.on("client-send-server",(data)=>{
						// console.log("data >>",data)
						// nsp.emit("all-client","ALL DATA")

					// })
					// socket.emit('hi', 'everyone!');	
					// this.SocketIO.signal('hi',socket,'DATATATA');
				// })
			// });
			console.log(this.res.success)
			
		// this.sendFile("index.html")
		this.res.error("I still Love you")
	}
	async update(){
		const modelGame = new GameModel();
		await modelGame.connect();
		console.log("update <>>>>>>>>>>>>>>>>")
		console.log("show " + modelGame.mongodb)
		modelGame.mongodb.createCollection("colDict", function(err, res) {
			if(err) throw err;
			console.log("created collection success")
		})
		modelGame.collection("colDict");
		modelGame.mongodb.find({}).toArray((err, result) =>{
			if (err) throw err;
			console.log(result);
			modelGame.close();
			this.send(JSON.stringify(result))
		});
		
	}
}

module.exports.Home = Home;