module.exports = function babelConfig(api) {
  const babelEnv = api.env();
  const alias = require('./alias.js');

  const isStaging = babelEnv === 'staging';
  const isProd = babelEnv === 'production';
  const isDev = !isStaging && !isProd;

  if (isStaging) {
    alias.config = './src/config/staging';
  }

  if (isProd) {
    alias.config = './src/config/production';
  }

  const config = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias,
        },
      ],
      ['import', { libraryName: 'antd', style: true }],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-syntax-dynamic-import'],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-object-assign',
    ],
  };

  if (isDev) {
    config.plugins.unshift('react-hot-loader/babel');
  }

  return config;
};
