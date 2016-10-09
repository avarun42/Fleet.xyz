module.exports = {
  entry: './app/index.js',
  output: {
    path: './src/js',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react']
      }
    }]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
}
