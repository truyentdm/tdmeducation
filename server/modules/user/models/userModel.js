const {Model} = require(baseURL+"engine")
class UserModel extends Model{
    constructor(){
        super();
        this.databasename = "users"
    }
    async update(){
        await this.connect();
        this.collection("colDict");
        return new  Promise((resolve,reject)=>{
            return this.mongodb.find({}).toArray((err, result) =>{
                if (err) return reject(err);
                this.close();
                resolve(JSON.stringify(result))
            });
        })
		
    }
    async register(data){
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasename);
        return new Promise((resolve,reject)=>{
            this.mongodb.insertOne(data,(err,res)=>{
                this.close();
                if (err) return reject(false);
                resolve(true)
            })
        })
    }
    async api_find(condition){
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1,exist: false})
        })
        this.collection(this.databasename);
        return new  Promise((resolve,reject)=>{
            return this.mongodb.find(condition).toArray((err, result) =>{
                this.close();
                if (err) return reject({error: 1,exist: false});
                if(result.length>0){
                    resolve({error: 0,exist:true,username: result[0].username, result: result[0]})
                }else{
                    resolve({error: 0,exist:false})
                }
            });
        })
    }
    async api_Register(_type,_keyword){
        let condition = {}
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1,exist: false})
        })
        this.collection(this.databasename);
        let type = _type != undefined ? _type : false;
        let keyword = _keyword != undefined ? _keyword : false
        condition = {[type]: keyword}
        console.log("info>>>>> ",condition)
        return new  Promise((resolve,reject)=>{
            if(type == false || keyword == false){
                console.log("reject>>>>>")
                return reject({error: 1,exist: false})
            }
            return this.mongodb.find(condition).toArray((err, result) =>{
                this.close();
                if (err) return reject({error: 1,exist: false});
                if(result.length>0){
                    resolve({error: 0,exist:true})
                }else{
                    resolve({error: 0,exist:false})
                }
            });
        })
    }
}

module.exports.UserModel = UserModel;