module.exports = {
    plugins: [
     "transform-remove-console"
    ]
   }
   
   // 生产环境如下配置
   
   const prodPlugins = []
   if (process.env.NODE_ENV === 'production') {
    prodPlugins.push('transform-remove-console')
   }
   module.exports = {
    plugins: [
     ...prodPlugins
    ]
   }