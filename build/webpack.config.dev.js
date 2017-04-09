var path = require("path");
var webpack = require("webpack");
var baseWebpackConfig = require("./webpack.config.base.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var conf = require("./conf.js");


var _cfg = Object.assign({}, baseWebpackConfig, {
    devtool: "eval-source-map"
});


Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    _cfg.entry[name] = [].concat("webpack-hot-middleware/client?reload=true")
                                      .concat(baseWebpackConfig.entry[name])
});

_cfg.plugins = baseWebpackConfig.plugins
        .concat(getHtmlChunk())
        .concat([
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("dev")
                }
            }),
            new webpack.ProvidePlugin({
                $: "jquery"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                filename: "common.js",
                minChunks: 2
            }),
            new ExtractTextPlugin({
                filename: "[name].css",
                disable: false,
                allChunks: true
            }),
        ]);

function getHtmlChunk() {
    var basePath = "./src/outside";
    return Object.keys(_cfg.entry).map(function (page) {
        if (page === "app") {
            return new HtmlWebpackPlugin({
                title: page,
                name: "p_" + page,
                template: path.join(conf.src, "./outside", "./tmpl/index.html"),
                filename: path.join(conf.root, "index.html"),
                inject: true,
                favicon: false,
                chunks: ['app', 'common']
            })
        } else {
            // other .html
        }
    })
}

module.exports = _cfg;