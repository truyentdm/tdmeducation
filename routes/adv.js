var app = require(baseURL+'engine');
var engine = app.Router();

engine.route({
    path: "/api_select",
    mapping: "server>modules>adv>controllers>dict.api_select",
    method: "post"
})
engine.route({
    path: "/api_update",
    mapping: "server>modules>adv>controllers>dict.api_update",
    method: "post"
})
module.exports = engine.export();
