const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

config = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
        {
        test: /\.(png|jpe?g|svg|gif|ico)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            encoding: true
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ],
      },
      {
        test: /\.jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
	/*{
	    test: /\.(png|svg|jpg|gif|ico)$/,
	    use: ['file-loader?name=[name].[ext]']
	}*/
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      favicon: './favicon.ico'
    }),
  ],
  devServer: {
    compress: true,
    //inline: true,
    port: '3000',
    allowedHosts: [
        '.rktlebnhwebworks.net'
    ],
    https: {
      key: ["<path to server TLS/SSL key>"],
      ca: "<path to server TLS/SSL bundle>", 
      cert: "<path to server TLS/SSL cert file>"
    },
    headers: { 
      'Cache-Control': 'max-age=0'
    }	    
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development'){
    console.log("development mode\n"); 
    config.devtool = "eval-source-map";
  }else{
    // config.devtool = 'source-map';
  }

  return config;
};
