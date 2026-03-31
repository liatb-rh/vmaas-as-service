import * as path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const BG_IMAGES_DIRNAME = 'bgimages';
const ASSET_PATH = process.env.ASSET_PATH || '/';
const NODE_ENV = (process.env.NODE_ENV || 'development') as Configuration['mode'];
const PROXY_TARGET = process.env.DEV_PROXY_TARGET || 'http://localhost:3001';

const config: Configuration & { devServer?: WebpackDevServerConfiguration } = {
  mode: NODE_ENV,
  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  devServer: {
    host: 'localhost',
    port: 9000,
    historyApiFallback: true,
    open: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    client: {
      overlay: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
    proxy: [
      {
        context: ['/api'],
        target: PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules\/(?!@vmaas-as-service)/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: NODE_ENV !== 'production',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use:
          NODE_ENV === 'production'
            ? [MiniCssExtractPlugin.loader, 'css-loader']
            : ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, 'node_modules/patternfly/dist/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/pficon'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/fonts'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/pficon'),
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
        include: (input) => input.indexOf('background-filter.svg') > 1,
        use: [
          {
            options: {
              limit: 5000,
              outputPath: 'svgs',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: (input) => input.indexOf(BG_IMAGES_DIRNAME) > -1,
        type: 'asset/inline',
      },
      {
        test: /\.svg$/,
        include: (input) =>
          input.indexOf(BG_IMAGES_DIRNAME) === -1 &&
          input.indexOf('fonts') === -1 &&
          input.indexOf('background-filter') === -1 &&
          input.indexOf('pficon') === -1,
        use: {
          loader: 'raw-loader',
          options: {},
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/patternfly'),
          path.resolve(__dirname, 'node_modules/@patternfly/patternfly/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css/assets/images'),
          path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/assets/images'),
          path.resolve(
            __dirname,
            'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css/assets/images',
          ),
          path.resolve(
            __dirname,
            'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css/assets/images',
          ),
        ],
        type: 'asset/inline',
        use: [
          {
            options: {
              limit: 5000,
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].bundle-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
    chunkFilename: '[name].bundle-[contenthash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/assets/images/', to: 'images', noErrorOnMissing: true }],
    }),
    new CopyPlugin({
      patterns: [{ from: '../../libs/i18n/locales', to: 'locales' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
    symlinks: false,
  },
  watchOptions: {
    followSymlinks: true,
  },
  snapshot: {
    managedPaths: [],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};

if (NODE_ENV === 'production') {
  (config.optimization || {}).minimizer = [
    new TerserJSPlugin({}),
    new CssMinimizerPlugin({
      minimizerOptions: {
        preset: ['default', { mergeLonghand: false }],
      },
    }),
  ];
  config.plugins?.push(
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      chunkFilename: '[name].bundle-[contenthash].css',
    }),
  );
} else {
  config.plugins?.push(
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  );
}

export default config;
