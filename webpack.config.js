// webpack.config.js
const path = require('path')

module.exports = {
    target: 'node',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.cjs$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
    // Additional configuration goes here
}
