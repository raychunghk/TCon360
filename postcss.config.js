module.exports = {
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      autoprefixer: {
        flexbox: 'no-2009',
      },
    },
  },
};
