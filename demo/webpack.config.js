const path = require('path');

module.exports = {
    entry: {
        index: "./src/index.tsx",
        react: "./src/react.tsx"
    },
    output: {
        path: 'dist',
        filename: '[name].bundle.js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".scss"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {test: /\.tsx?$/, loader: "ts-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"},
            {test: /\.scss$/, loader: "style!css!autoprefixer-loader?browsers=last 2 versions!sass", exclude: /node_modules/}
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.css$/, loader: "source-map-loader"}
        ]
    },

// When importing a module whose path matches one of the following, just
// assume a corresponding global variable exists and use that instead.
// This is important because it allows us to avoid bundling all of our
// dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
    },
};