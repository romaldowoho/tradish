module.exports = {
  devServer: {
    host: "localhost",
    port: 8080
  },
  publicPath: "/",
  pages: {
    index: {
      entry: "./src/client/main.js"
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production"
};
