module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    "storybook-addon-next-router",
    'storybook-react-i18next'
  ],
  webpackFinal: (config) => {
    const path  = require('path');

    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];

    config.module.rules.push({
      test: /\.(s*)css$/,
      use: ['style-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src'),
    });

    return config;
  }
}
