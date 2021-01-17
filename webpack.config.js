const path = require('path');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: 'development',
    resolve: {  
        extensions: [".js", ".ts", ".tsx"],
    },
    devServer: {
        port: 3000,
        contentBase: './build',
    },
    module: {
        rules: [
            { 
                test: /\.tsx?$/, 
                use: 'ts-loader' 
            },
            {
                test: /\.glsl$/,
                use: 'raw-loader',
              }
        ]
    },
}