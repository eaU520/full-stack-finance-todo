module.exports = {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: ['node_modules'],
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        {
          test: /\.gif$/,
          type: 'asset/inline',
        },
        {
          test: /\.(ttf|eot|svg)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      alias: {
        // config$: './configs/app-config.js',
        react: path.resolve('./node_modules/react'),
      },
      extensions: ['.js', '.jsx'],
      modules: [
        'node_modules',
        'bower_components',
        'shared',
        '/shared/vendor/modules',
      ],
    },
  };