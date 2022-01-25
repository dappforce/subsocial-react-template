/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

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
    reactStrictMode: true,
    i18n,
    webpack: (config, {isServer}) => {
        const oneOf = config.module.rules.find(
            (rule) => typeof rule.oneOf === 'object'
        )

        if (oneOf) {
            const moduleCssRule = oneOf.oneOf.find(
                (rule) => regexEqual(rule.test, /\.module\.css$/)
            )

            if (moduleCssRule) {
                const cssLoader = moduleCssRule.use.find(({loader}) =>
                    loader.includes('css-loader')
                )
                if (cssLoader) {
                    cssLoader.options.modules.mode = 'local'
                }
            }

            const fixUse = (use) => {
                if (use.loader.indexOf('css-loader') >= 0 && use.options.modules) {
                    use.options.modules.mode = 'local'
                }
            }

            oneOf.oneOf.forEach((rule) => {
                if (Array.isArray(rule.use)) {
                    rule.use.map(fixUse)
                } else if (rule.use && rule.use.loader) {
                    fixUse(rule.use)
                }
            })
        }

        if (!isServer) {
            config.resolve.fallback.fs = false
        }

        config.plugins = config.plugins || []

        return config
    },
}
