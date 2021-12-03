module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/!**/!*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
  ],
  webpackFinal: (config, {configType}) => {
    const path  = require('path');

    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];

    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules=true'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  }

}
