const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        content: './src/content.ts',
        test: {
            import: './test/test.ts',
            filename: '../test/dist/test.js'
        }
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }, {
                test: /\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/i,
                use: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "assets" },
                { from: "dist", to: '../test/dist', filter: path => path.match(/\.(png|jpe?g|gif|svg|ttf|woff2?|eot)$/i) },
                { from: "test/index.html", to: '../test/dist' },
            ],
        }),
    ],
    watchOptions: {
        ignored: 'dist/**',
    }
};