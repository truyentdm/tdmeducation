const myData = [
    {
        id: 1,
        wordbook: {
            en: "active",
            vi: "hanh cong"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/active/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "the sun",audio: ""},
                    sentence: {text : "‘I'm meeting the boss’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        },
        category: [],
        report: {}
    },
    {
        id: 2,
        wordbook: {
            en: "a",
            vi: "cac - chi vat"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/ə/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "‘a hundred’",audio: ""},
                    sentence: {text : "‘it has been an honour to meet you’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        }
    },
    {
        id: 3,
        wordbook: {
            en: "hello",
            vi: "Xin chao"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/həˈləʊ/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "the sun",audio: ""},
                    sentence: {text : "‘I pressed the phone button and helloed’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        }
    },
    {
        id: 4,
        wordbook: {
            en: "bye",
            vi: "tam biet"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/bʌɪ/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "short for goodbye",audio: ""},
                    sentence: {text : "‘Okay, James. I'll call her now. Bye’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        }
    },
    {
        id: 5,
        wordbook: {
            en: "can",
            vi: "co the"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/kan/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "the sun",audio: ""},
                    sentence: {text : "‘I can speak Italian’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        }
    },
    {
        id: 6,
        wordbook: {
            en: "go",
            vi: "di"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/ɡəʊ/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "‘we went to the cinema’",audio: ""},
                    sentence: {text : "‘he went to Cambridge University’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        }
    },
    {
        id: 1,
        wordbook: {
            en: "move",
            vi: "di chuyen"
        },
        audio: {
            en: "",
            vi: ""
        },
        pronunciation: {
            en: "/muːv/",
            vi: ""
        },
        example: {
            en: [
                {
                    id: 1,
                    phrase: {text: "the sun",audio: ""},
                    sentence: {text : "‘do move up, there's just room for me if you do’",audio: ""},
                    image: ""
                }
            ],
            vi: [
                {
                    id: 1,
                    phrase: {text: "mat troi",audio: ""},
                    sentence: {text : "the sun ...",audio: ""},
                    image: ""
                }
            ]
        }
    }
]

module.exports.myData = myData;




const {Model} = require(baseURL+"engine")
var ObjectId = require('mongodb').ObjectID;
class SmartStudyModel extends Model{
    constructor(){
        super();
        this.databasename = "dict"
        this.databasebrain = "brain"
        this.user_target = 5;
        this.brain_target = 30;
    }
    datePutTime(date,loop = 0){
        const dateObj = new Date(date);
        const month = dateObj.getUTCMonth() + 1; //months from 1-12
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        const newdate = `${year}/${month}/${day}`
        let _date = new Date(newdate)
        _date.setDate(_date.getDate()+loop)
        return  _date;
    }
    async insertOne(data){
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
    async getDataUserBrain(id){
        let _id = ObjectId(id)
        let data = [];
        let x1=0,x2 = 0,x3=0,y1=0,y2=0,y3=0,totalBrain=0,todayStudy=0,totaltake=0;
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasebrain);
        await this.getWordMustStudyToday(_id)
        .then(res=>{
            
            //40%
            let pt = (this.user_target/100)*40
            y3 = res.length;
            if(res.length >= pt){
                y1 = pt;
                y2 = 0;
            }else{
                y1 = res.length;
                y2 = pt - res.length
                console.log("y2 ",y2)
            }
            if(res.length > 0){
                //get id on brain
                for (let i=0;i<y1;i++){
                    data.push({"dict_id": ObjectId(res[i].dict_id) })
                }
            }
        })
        await this.getNoTRemember (_id)
        .then(res=>{
            //60%
            let pt = (this.user_target/100)*60 + y2
            x3 = res.length
            if(res.length >= pt){
                x1 = pt;
                x2 = 0;
            }else{
                x1 = res.length;
                x2 = pt - res.length;
                console.log("x2 ",x2)
            }
            if(res.length > 0){
                //get ID in brain push array
                for (let i=0;i<x1;i++){
                    data.push({"dict_id": ObjectId(res[i].dict_id) })
                }
            }
        })
        
        await this.getTotalDocument(_id)
        .then(res=>{
            if(res>0){
                totalBrain = res;
            }
        })
        await this.getTotalStudyToday(_id)
        .then(res=>{
            if(res>0){
                todayStudy = res;
            }
        })
        //totaltake
        console.log("y2 ",y2)
        console.log("x2 ",x2)
        totaltake = x2;
        const turnControl = {
            data: data,
            totalBrain: totalBrain,
            totaltake: totaltake,
            todayStudy: todayStudy,
            repeatStudy: y3,
            user_target: this.user_target
        }
        
        return turnControl;
    }
    getNoTRemember (_id){
        return new Promise((resolve,reject)=>{
            this.mongodb.find({ user_id: _id ,loop: {$eq: 1}}).toArray((err,res)=>{
                if(err) return reject(false)
                resolve(res)
            })
        })
    }
    //word study repeat
    getWordMustStudyToday(_id){
        return new Promise((resolve,reject)=>{
            let d = this.datePutTime(new Date())
            this.mongodb.find({ user_id: _id ,loop: {$gt: 1}, at_time: {$lte: Date.parse(d)}}).toArray((err,res)=>{
                if(err) return reject(false)
                resolve(res)
            })
        })
    }
    
    getTotalDocument(_id){
        return new Promise((resolve,reject)=>{
            this.mongodb.find({ user_id: _id }).toArray((err,res)=>{
                if(err) return reject(false)
                resolve(res.length)
            })
        })
    }
    
    getTotalStudyToday(_id){
        return new Promise((resolve,reject)=>{
            let d = Date.parse(this.datePutTime(new Date()))
            this.mongodb.find({user_id: _id, loop: { $gt : 1} , last_time: {$eq: d} }).toArray((err,res)=>{
                if(err) return reject(false)
                resolve(res.length)
            })
        })
    }
    getTotalStudy(_id){
        return new Promise((resolve,reject)=>{
            this.mongodb.find({user_id: _id, loop: { $gt : 1} }).toArray((err,res)=>{
                if(err) return reject(false)
                resolve(res.length)
            })
        })
    }
    
    async takeDataDict(start,total){
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasename);
        return new Promise((resolve,reject)=>{
            this.mongodb.find({}).sort({ _id: 1}).skip(start).limit(total).toArray((err,res)=>{
                this.close()
                if(err) return reject(false)
                resolve(res)
            })
        })
    }
    async insertBrainData(user_id,data){
        let id = ObjectId(user_id)
        let enData = [],turnData = []
        let date = this.datePutTime(new Date())
        for(let i=0;i< data.length;i++){
            turnData.push({"dict_id": ObjectId(data[i]._id)})
            enData[i] = {
                user_id: id,
                dict_id: data[i]._id,
                loop: 1,
                at_time: Date.parse(date),
                point: 0,
                coefficient: 1,
                toward: 1,
                target: this.brain_target,
                last_time: Date.parse(date)
            }
        }
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasebrain);
        this.mongodb.insertMany(enData,(err,res)=>{
            if(err) throw err
            console.log("success")
        })
        return turnData;
    }
    async mergeBrainDict(condition,user_id){
        let id = ObjectId(user_id);
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasebrain);
        return new Promise((resolve,reject)=>{
            this.mongodb.aggregate([
                { $lookup:
                    {
                        from: this.databasename,
                        localField: 'dict_id',
                        foreignField: '_id',
                        as: 'datadetails'
                    }
                },{
                    $match:{
                        $or: condition,
                        "user_id": id
                    }
                 },
            ]).toArray(function(err, res) {
                if (err) reject(err)//throw err;
                resolve(res)
            });
        })
    }
    async updateDataPointUser(data){
        const { loop,point,coefficient,toward,target } = data;
        const id = { _id: ObjectId(data._id) }
        var date = this.datePutTime(new Date(),loop)
        const at_time = Date.parse(date);
        const late_time = Date.parse(this.datePutTime(new Date()));
        const upData = { $set: { loop,point,coefficient,toward,target,at_time, last_time: late_time }}
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasebrain);
        this.mongodb.updateOne(id,upData,(err,res)=>{
            this.close();
            if (err) throw err;
        })
    }
    async getInfoToday(id){
        const _id = ObjectId(id);
        let totalStudyToday = 0;
        let totalStudy = 0;
        await this.connect()
        .catch(e=>{
            console.log("Can't access DB")
            return Promise.reject({error: 0,db: -1})
        })
        this.collection(this.databasebrain);
        await this.getTotalStudyToday(_id)
        .then(res=>{
            totalStudyToday = res;
        })
        await this.getTotalStudy(_id)
        .then(res=>{
            totalStudy = res;
        })
        return { totalStudy, totalStudyToday}
    }
}

module.exports.SmartStudyModel = SmartStudyModel;