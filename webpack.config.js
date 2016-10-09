module.exports = {
  entry: './app/index.jsx',
  output: {
    path: './src/js',
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
