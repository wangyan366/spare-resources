const path = require("path");
const myTheme = path.resolve(__dirname, "src/assets/style/vantChange.less");
module.exports = {
      css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${themePath}";`
        }
      },
    }
  },
}
