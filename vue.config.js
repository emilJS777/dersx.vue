const { defineConfig } = require('@vue/cli-service')
const Dotenv = require("dotenv-webpack")

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
      config.plugins.push(new Dotenv({
        path: './.env',
        safe: false,
        systemvars: true
      }))
  },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = 'skillx';
            args[0].description = "skillx description"
            return args;
        })
    },
})
