var path = require("path");
var root = path.join(__dirname, "../");
var dist = path.join(root, "./dist");
var src = path.join(root, "./src");

module.exports = {
    "root": root,
    "src": src,
    "dist": dist,
    "entry": {
        "app": "./index.js"
    }
}