// https://github.com/michael-ciniawsky/postcss-load-config
const path = require("path");
module.exports = ({
  file
}) => {
  let vantFlag = file && file.dirname && file.dirname.indexOf("vant") > -1;
  let rootValue = vantFlag ? 375 : 750; // 判断条件自行调整
  console.log("🚀 ~ file: .postcssrc.js ~ line 6 ~ rootValue", rootValue)
  return {
    plugins: {
      autoprefixer: {
        browsers: ['Android >= 4.0', 'iOS >= 7']
      },
      "postcss-px-to-viewport": {
        unitToConvert: 'px',
        viewportWidth: rootValue,
        unitPrecision: 3,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: [],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [],
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 2048
      }
    }
  }
}


