module.exports = {
    

    baseUrl: '/',
    devServer: {
        open: process.platform === 'darwin',
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },

}