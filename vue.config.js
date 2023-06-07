module.exports = {
  lintOnSave: false, // 暂时关闭代码格式检测
  // 配置反向代理
  devServer: {
    port: 8000, // 随便改端口号
    proxy: {
      '/api': {
        target: 'https://i.maoyan.com',
        changeOrigin: true
      }
    }
  }
}
