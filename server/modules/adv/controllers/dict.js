const CONST = require("../../../constants")
const path = require("path")
var ObjectId = require('mongodb').ObjectID;
const { Controller } = require(baseURL+"engine")
const { DictModel } = require("../models/dictModel")

class Dict extends Controller{
    constructor(){
        super();
        this.dm = new DictModel();
    }
    async api_select(){
        let condition =  {}
        if(this.req.body.id != undefined){
            condition = {_id: ObjectId(this.req.body.id)}
            console.log("SEARCH ID ",this.req.body.id)
        }
        await this.dm.api_select(condition)
        .then(data =>{
            if(!data){
                this.res.error(data)
            }else{
                this.res.success(data,"success")
            }
        })
        .catch(e=>{
            this.res.error(e)
        })
    }
    async api_update(){
        var id = this.req.body.id != undefined ? this.req.body.id : ""
        var data = this.req.body.data != undefined ? this.req.body.data : ""
        if(id != "" && data != ""){
            var condition = {_id: ObjectId(id)}
            this.dm.api_update(condition,data)
            .then(data=>{
                this.res.success(data,"success")
            })
            .catch(e=>{
                this.res.error(e.toString())
            })
        }else{
            this.res.error("Value is incorrect")
        }
    }
}

module.exports.Dict = Dict;
