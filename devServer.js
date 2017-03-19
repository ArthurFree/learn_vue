var path = require("path");
var webpack = require("webpack");
var express = require("express");
var config = require('./build/webpack.config.dev.js');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	inline: true,
	hot: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(5000);