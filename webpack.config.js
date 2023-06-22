// webpack.config.js
import path from 'path'
const __dirname = path.dirname(__filename)

export default {
    target: 'node',
    entry: './index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
    // Additional configuration goes here
}
