const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = ({config, isServer}) => {

    if (!isServer) {
        config.node = {
            fs: 'empty'
        }
    }

// TSConfig, uses the same file as packages
    config.resolve.plugins = config.resolve.plugins || []
    config.module.rules.push({
        test: /\.js$/,
        loader: require.resolve('@open-wc/webpack-import-meta-loader')
    })
    config.resolve.plugins.push(
        new TsconfigPathsPlugin({
            configFile: path.resolve(__dirname, '../tsconfig.json'),
        })
    )

    return config
}
