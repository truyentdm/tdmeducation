var app = require(baseURL+'engine');
var engine = app.Router();

engine.route({
    path: "/",
    mapping: "views",
    method: "get"
})  
engine.route({
    path: "/Games/StudySmart_Play",
    mapping: "views",
    method: "get"
})
engine.route({
    path: "/web",
    mapping: "views",
    method: "get"
})

engine.route({
    path: "/mobile",
    mapping: "",
    method: "get"
})

engine.route({
    path: "/test",
    mapping: "server>modules>home>controllers>index.indexHome",
    method: "get"
})


module.exports = engine.export();
