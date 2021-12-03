const path = require('path')
const Dotenv = require('dotenv-webpack')

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
}

const regexEqual = (x, y) => {
    return (
        x instanceof RegExp &&
        y instanceof RegExp &&
        x.source === y.source &&
        x.global === y.global &&
        x.ignoreCase === y.ignoreCase &&
        x.multiline === y.multiline
    )
}

module.exports = {
    images: {
        loader: 'custom'
    },
    webpack: (config, {isServer}) => {
        const oneOf = config.module.rules.find(
            (rule) => typeof rule.oneOf === 'object'
        )

        if (oneOf) {
            const moduleCssRule = oneOf.oneOf.find(
                (rule) => regexEqual(rule.test, /\.module\.css$/)
                // regexEqual(rule.test, /\.module\.(scss|sass)$/)
            )

            if (moduleCssRule) {
                const cssLoader = moduleCssRule.use.find(({loader}) =>
                    loader.includes('css-loader')
                )
                if (cssLoader) {
                    cssLoader.options.modules.mode = 'local'
                }
            }
        }

        if (!isServer) {
          config.resolve.fallback.fs = false
        }

        config.plugins = config.plugins || []

        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
            })
        ]

        const fixUse = (use) => {
            if (use.loader.indexOf('css-loader') >= 0 && use.options.modules) {
                use.options.modules.mode = 'local'
            }
        }

        if (oneOf) {
            oneOf.oneOf.forEach((rule) => {
                if (Array.isArray(rule.use)) {
                    rule.use.map(fixUse)
                } else if (rule.use && rule.use.loader) {
                    fixUse(rule.use)
                }
            })
        }

        return config
    },
}
