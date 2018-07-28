"use strict";
const path = require('path');
var ROOT = path.join(__dirname,'../../');
global.baseURL = ROOT;
module.exports.ROOT = ROOT;
module.exports.ENGINE = path.join(path.join(__dirname,'../../engine'));
module.exports.SERVER = path.join(path.join(__dirname,'../'));
module.exports.VIEWS = path.join(path.join(__dirname,'../../views'));
