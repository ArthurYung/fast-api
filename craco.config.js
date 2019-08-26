const path = require("path");
const packageJson = require("./package.json");
const { https, port, host } = packageJson;

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    configure(config) {
      config.output.globalObject = "this";
      return config;
    }
  },
  devServer: {
    https,
    port,
    host
  }
};
