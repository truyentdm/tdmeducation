var app = require(baseURL+'engine');
var engine = app.Router();

engine.route({
    path : "/store",
    mapping : "server>modules>games>controllers>SmartStudy.storeData",
    method  : "POST"
})  
engine.route({
    path: "/api_insert",
    mapping: "server>modules>games>controllers>SmartStudy.api_insert",
    method: "post"
})
engine.route({
    path: "/user_id",
    mapping: "server>modules>games>controllers>SmartStudy.user_id",
    method: "post"
})
engine.route({
    path: "/up_point_user",
    mapping: "server>modules>games>controllers>SmartStudy.up_point_user",
    method: "post"
})
engine.route({
    path: "/info_today",
    mapping: "server>modules>games>controllers>SmartStudy.getUser_info",
    method: "post"
})
module.exports = engine.export();
