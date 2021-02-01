import api from './api'; // 导入接口域名列表
import http from './http'; // 导入http中创建的axios实例



export default {
  install(Vue) {
    Vue.prototype.$http = this
  },

  //登录
  login(params = '', header = '') {
    return http.post(api.login, params, header);
  },
  //退出登录
  loginout(params = '', header = '') {
    return http.post(api.loginout, params, header);
  },
  //商品数据
  product_list(params = '', header = '') {
    return http.get(api.product_list, params, header);
  },
  //品类数据
  category(params = '', header = '') {
    return http.get(api.category, params, header);
  },
  //订单数据
  order(params = '', header = '') {
    return http.get(api.order, params, header);
  },

}