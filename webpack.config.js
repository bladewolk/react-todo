var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    context: __dirname + "",
    // devtool: debug ? "inline-sourcemap" : null,
    // entry: "./resources/assets/js/index.js",
    entry: {
        app:[
            'react-hot-loader/patch',
            "./resources/assets/js/index.js"
        ]
    },
    output: {
        path: __dirname + "/public/js",
        filename: "bundle.js",
        publicPath: "/dev/",
    },
    watch: true,
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        hot: true,
        inline: true,
        proxy: {
            "/api/*": {
                target: "http://react-todo.dev"
            }
        },
        contentBase: "public",
    }
};