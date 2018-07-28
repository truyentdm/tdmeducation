var app = require(baseURL+'engine');
var engine = app.Router();

engine.route({
    path: "/login",
    mapping: null,
    method : "get"
  })  
engine.route({
    path: "/login",
    mapping: "server>modules>user>controllers>user.login",
    method: "POST"
})
engine.route({
    path: "/logout",
    mapping: "server>modules>user>controllers>user.logout",
    method: "POST"
})
engine.route({
    path : "/logout",
    method: "get"
})
engine.route({
    path: "/passport",
    mapping: "server>modules>user>controllers>user.passport",
    method: "POST"
})
engine.route({
    path: "/user",
    mapping: "server>modules>user>controllers>user.update",
    method: "GET"
})
engine.route({
    path: "/register",
    mapping: null,
    method: "GET"
})
engine.route({
    path: "/exist_user",
    mapping: "server>modules>user>controllers>user.exist_user",
    method: "POST"
})
engine.route({
    path: "/register",
    mapping: "server>modules>user>controllers>user.register",
    method: "POST"
})
engine.route({
    path: "/:page",
    mapping: "",
    method: "GET"
})

module.exports = engine.export();
