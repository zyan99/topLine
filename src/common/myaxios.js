// 1. 引入 axios
import axios from "axios"
// 配置公共的url
//process.env.VUE_APP_URL 如果是运行 npm run serve
// 是从 .env.development 文件中获取的
axios.defaults.baseURL = process.env.VUE_APP_URL
// 配置路由拦截
// 请求拦截器
axios.interceptors.request.use(function(config){
    let data = config.data || {};// get 请求时候没有 data 的防御性代码
    data["oauth_token"] = "bLrXDOxg8HgNvkYfPQRjMljSgubXYvSx";// 在登录的情况下是存在, 如没登陆就不存在
    config.data = data;
    // console.log(config);
    return config;
},function(error){
    return Promise.reject(error);
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });


// 导出axios
export default axios;

