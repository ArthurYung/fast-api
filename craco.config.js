const path = require("path");
const packageJson = require("./package.json");
const { https, port, host } = packageJson;

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    https,
    port,
    host,
  },
};
