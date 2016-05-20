var webpack = require('webpack')

module.exports = {

    entry: {
        "controlled-grid": './examples/controlled-grid/js/Page',
        "faceted-search": './examples/faceted-search/js/Page',
        "form-dynamic": './examples/form-dynamic/js/Page'
    },
    output: {
        libraryTarget: 'amd',
        filename: './examples/[name]/js-built/Page.js'
    },

    externals: {
        "kendo": true,
        "jquery": true,
        "underscore": true,
        "q": true,
        "react": true,
        "react-dom": true,
        "wingspan-forms": true
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
