const path = require(`path`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const OptimizeCss = require(`optimize-css-assets-webpack-plugin`);
const HTMLWebpackPlugin = require(`html-webpack-plugin`);
const TerserWebpackPlugin = require(`terser-webpack-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
const isDev = process.env.NODE_ENV === `development`;
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      },
    },
    `css-loader`
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, `src`),
  mode: `development`,
  entry: {
    main: `./index.tsx`,
  },
  output: {
    filename: `[name].js`,
    path: path.join(__dirname, `public`)
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`,`.jsx`, `json` , `.less`]
  },
  optimization: {
    minimizer: [new OptimizeCss(), new TerserWebpackPlugin()]
  },
  devtool: `source-map`,
  devServer: {
    host: `0.0.0.0`,
    contentBase: path.join(__dirname, `public`),
    inline: true,
    port: 5350,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: `./index.html`
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(jpg|img|png|webp|svg)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[path][name].[ext]`
            },
          }
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[path][name].[ext]`
            },
          }
        ]

      },
      {
        test: /\.less$/,
        use: cssLoaders(`less-loader`)
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      },
    ]
  },
};
