var webpack = require('webpack');

module.exports = {

    entry: {
        "controlled-grid": './examples/controlled-grid/js/Page',
        "faceted-search": './examples/faceted-search/js/Page',
        "form-dynamic": './examples/form-dynamic/js/Page',
        "form-master-detail": './examples/form-master-detail/js/Page',
        "form-simple": './examples/form-simple/js/Page',
        "form-simple-2": './examples/form-simple-2/js/Page',
        "form-twins": './examples/form-twins/js/Page',
        "helloworld": './examples/helloworld/js/Page',
        "sandbox": './examples/sandbox/js/Page',
        "state-at-top": './examples/state-at-top/js/Page'
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
};
