const CONST = require("../../../constants")
const { Controller } = require(baseURL+"engine")
const { myData, SmartStudyModel } = require("../models/SmartStudyModel")

class SmartStudy extends Controller{
	constructor(){
		super()
        console.log('[SER][SmartStudy]','load constructor')
        this.sm = new SmartStudyModel()
        this.default_user = "5b334a77eba4da11cc3e1117"; //truyendm
    }
    
    async storeData(){
        let id = this.getUser_id()
        
        let data = [],listIDict = null;
        let todayStudy = 0,repeatStudy=0,user_target=0,totalBrain= 0,totaltake=0; 

        await this.sm.getDataUserBrain(id)
        .then(res=>{
            listIDict = res.data;
            todayStudy = res.todayStudy;
            repeatStudy = res.repeatStudy;
            user_target = res.user_target;
            totalBrain = res.totalBrain;
            totaltake = res.totaltake;
            
        }).catch(e=>console.log("STORE DATE ERROR 1",e))
        if(totaltake > 0){
            await this.sm.takeDataDict(totalBrain,totaltake)
            .then(res=>{
                if(res.length>0){
                    return this.sm.insertBrainData(id,res);
                }
            })
            .then(res=>{
                listIDict = [...listIDict,...res];
            })
            .catch(e=>console.log("STORE DATE ERROR 2"))
        }
        console.log("listIDict ",listIDict)
        
        await this.sm.mergeBrainDict(listIDict,id)
        .then(res=>{
            data = [...res]
        })
        .catch(e=>console.log(e.toString()))
        let sendData = {
            data: data,
            todayStudy: todayStudy,
            repeatStudy: repeatStudy,
            user_target: user_target
        }
        this.res.success(sendData,"success")
    }
    async api_insert(){
        var condition = false
        const wordbook = this.req.body.wordbook
        if(wordbook["en"] == "" || wordbook["en"] == undefined || wordbook["en"] == null){
            console.log("wordbook error ",wordbook)
            condition = false
        }else{
            const data = {
                wordbook: this.req.body.wordbook,
                audio:this.req.body.audio,
                example: this.req.body.example,
                pronunciation: this.req.body.pronunciation,
            }
            await this.sm.insertOne(data)
            .then(result=>{
                condition = true
            })
            .catch(e=>{
                console.log(e.toString())
                condition = false
            })
        }
        
        console.log(this.req.body)
        this.res.success(condition,"success")
    }
	user_id(){
        let id = 0;
        if(this.req.isAuthenticated()){
            id = this.req.session["user"].user_id;
        }
        this.res.success(id,"success")
    }
    getUser_id(){
        let id = this.default_user;
        if(this.req.isAuthenticated()){
            id = this.req.session["user"].user_id;
        }
        return id;
    }
    up_point_user(){
        console.log(">>> ",this.req.body)
        this.sm.updateDataPointUser(this.req.body)
        this.res.success(true,"success")
    }
    async getUser_info(){
        const id = this.getUser_id()
        console.log("getUser_info")
        this.sm.getInfoToday(id)
        .then(res=>{
            this.res.success(res)
        }).catch(e=>{
            throw e;
            this.res.error();
        })
        
    }
}

module.exports.SmartStudy = SmartStudy;