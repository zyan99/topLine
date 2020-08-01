module.exports = {
    lintOnSave: false,// 关闭 eslint
    publicPath: "./", // 配置打包文件路径
    productionSourceMap: false, // 默认为 true 生成 sourcemap 文件可以在控制台看到的webpack, 设置为false, 不让其生成
    devServer: {
        proxy: 'http://tt.linweiqin.com/api/tt/' // 转发的地址
    }
    // devServer: {
    //     proxy: 'http://localhost:8090' 
    // }
}