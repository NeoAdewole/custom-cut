import defaultConfig from '@wordpress/scripts/config/webpack.config.js';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  ...defaultConfig,
  entry: {
    ...defaultConfig.entry(),
    "index": "./src/index.js"
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};