var webpack = require('webpack')

module.exports = {

    entry: './js/wingspan-forms.js',

    output: {
        library: 'WingspanForms',
        libraryTarget: 'umd',
        path: './dist',
        filename: 'wingspan-forms.js',
        publicPath: '/dist/'
    },

    externals: {
        "kendo": true,
        "jquery": true,
        "react": true,
        "react-dom": true
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
        ]
    },

    plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.DefinePlugin({
        //    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        //})
    ]
}
