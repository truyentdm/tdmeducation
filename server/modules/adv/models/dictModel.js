const {Model} = require(baseURL+"engine")
class DictModel extends Model{
    constructor(){
        super();
        this.databasename = "dict"
    }
    async api_update(condition,data){
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        console.log("condition",condition)
        console.log("data",data)
        this.collection(this.databasename);
        return new Promise((resolve,reject)=>{
            this.mongodb.updateOne(condition,{$set: data},(err,res)=>{
                this.close();
                if (err) return reject(false);
                resolve(true)
            })
        })
    }
    async api_select(condition){
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1,exist: false})
        })
        this.collection(this.databasename);
        console.log(">>>>>>>>>>>>",condition)
        return new  Promise((resolve,reject)=>{
            return this.mongodb.find(condition).toArray((err, result) =>{
                this.close();
                if (err) return reject({error: 1,exist: false});
                console.log("<<<<<<<<<<",result)
                if(result.length>0){
                    resolve(result)
                }else{
                    resolve(false)
                }
            });
        })
    }

}

module.exports.DictModel = DictModel;