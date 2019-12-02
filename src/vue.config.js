module.exports = {
  devServer: {
    host: "localhost",
    port: 8080
  },
  pages: {
    index: {
      entry: "main.js"
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production"
};
