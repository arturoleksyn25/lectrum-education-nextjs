//Core
const { DuplicatesPlugin } = require('inspectpack/plugin');
const withPlugins = require('next-compose-plugins');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanCss = require('clean-css');
const path = require('path');

const withTM = require('next-transpile-modules')([
  // These modules doesn't support IE11:
  'logform',
  'winston-transport',
  'async',
  'is-stream',
]);

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withPlugins([
  [ withBundleAnalyzer, {}],
  [ withTM, {} ]
], {
  webpack: (config, { isServer }) => {
    const isProduction = process.env.NODE_ENV === 'production';

    const updatedAliases = {
      ...config.resolve.alias,
      'readable-stream': path.join(__dirname, './node_modules/readable-stream'),
      inherits: path.join(__dirname, './node_modules/inherits'),
      'safe-buffer': path.join(__dirname, './node_modules/safe-buffer'),
    };

    config.resolve.alias = {
      ...updatedAliases,
    };

    if (isProduction) {
      config.plugins.push(
        new DuplicatesPlugin({
          verbose: true,
          emitErrors: true,
        }),
      );
    }

    config.optimization.minimizer.push(
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: CleanCss,
        cssProcessorOptions: {
          level: {
            1: {
              all: true,
              normalizeUrls: false,
            },
            2: {
              restructureRules: true,
              removeUnusedAtRules: true,
              skipProperties: [ 'border-top', 'border-bottom' ],
            },
          },
        },
        canPrint: true,
      }),
    );


    if (!isServer) {
      return {
        ...config,
        node: {
          fs: 'empty'
        }
      }
    }

    return config;
  },
  publicRuntimeConfig: {
    JAVA_SCRIPT_LOADING_DELAY: 3500,
    ANDROID_VERSION_FOR_DELAY: 8,
    IOS_VERSION_FOR_DELAY: 12.5,
  }
});
