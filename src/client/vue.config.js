module.exports = {
  devServer: {
    host: "localhost",
    port: 8080
  },
  publicPath: "/dist/",
  pages: {
    index: {
      entry: "main.js"
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production"
};
