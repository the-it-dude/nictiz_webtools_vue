module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    disableHostCheck: true
  },
  devServer: {
    proxy: 'https://termservice.test-nictiz.nl/',
  },
  publicPath: '/nictiz_webtools_vue',
}