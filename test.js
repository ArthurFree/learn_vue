var conf = require("./build/conf.js");

var baseWebpackConfig = require("./build/webpack.config.base.js");

var config = require("./build/webpack.config.dev.js");

console.log("--- webpack config ---", config);