var app = require(baseURL+'engine');
var engine = app.Router();

engine.route({
    path : "/",
    mapping : "",
    method  : "GET"
})
engine.route({
    path : "/StudySmart/:page",
    mapping : "",
    method  : "GET"
})  

module.exports = engine.export();
