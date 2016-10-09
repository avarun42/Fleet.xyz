module.exports = {
  entry: './app/index.js',
  output: {
    path: './src/js',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
