var path = require("path");
var webpack = require("webpack");
var conf = require("./conf.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: getEntry(),
    output: {
        path: conf.dist,
        filename: "[name],js",
        publicPath: "./dist"
    },
    module: {
        rules: [
            {
                test: /.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ["style-loader", "css-loader"]
                })
            },
            {
                test: /\scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.woff(\?t=\d+)?$/,
                exclude: /node_modules/,
                loader: "file-loader?name=fonts/[name][hash].woff&limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.woff2(\?t=\d+)?$/,
                exclude: /node_modules/,
                loader: "file-loader?name=fonts/[name][hash].woff2&limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.ttf(\?t=\d+)?$/,
                exclude: /node_modules/,
                loader: "file-loader?name=fonts/[name][hash].ttf&limit=10000&minetype=application/octet-stream"
            },
            {
                test: /\.eot(\?t=\d+)?$/,
                exclude: /node_modules/,
                loader: "file-loader?name=fonts/[name][hash].eot&limit=10000"
            },
            {
                test: /\.svg(\?t=\d+)?$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=10000&minetype=image/svg+xml"
            },
            {
                test: /.*\.(gif|png|jpe?g)$/i,
                exclude: /node_modules/,
                loader: "url-loader?mimetype=image/png"
            }
        ]
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', '.json', '.vue', '.scss'],
        alias: {
            SRC: conf.src,
            'vue$': 'vue/dist/vue.common.js',
            'assets': path.join(conf.src, "./assets"),
            'components': path.join(conf.src, "./components")
        }
    },
    plugins: []
}

function getEntry() {
    var entry = {};
    Object.getOwnPropertyNames(conf.entry).map(function (name) {
        entry[name] = path.join(conf.src, conf.entry[name])
    });
    return entry;
}