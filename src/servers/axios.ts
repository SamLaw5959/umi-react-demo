import axios from 'axios';
import { notification, message } from 'antd';
import type { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
const pendingMap = new Map();

const LoadingInstance = {
  _target: null,
  _count: 0,
};

const myAxios = (
  axiosConfig: AxiosRequestConfig,
  customOptions?: AxiosRequestConfig,
) => {
  const service: AxiosInstance = axios.create({
    baseURL: 'https://m.maizuo.com', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  // 自定义配置
  let custom_options = Object.assign(
    {
      repeat_request_cancel: true, // 是否开启取消重复请求, 默认为 true
      loading: false, // 是否开启loading层效果, 默认为false
      reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
      error_message_show: true, // 是否开启接口错误信息展示,默认为true
      code_message_show: false, // 是否开启code不为0时的信息提示, 默认为false
    },
    customOptions,
  );

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config);
      custom_options.repeat_request_cancel && addPending(config);
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++;
        if (LoadingInstance._count < 1) {
          notification['info']({
            message: '温馨提示',
            description: '正在请求中，稍安勿躁',
          });
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      removePending(response.config);
      LoadingInstance._count = 0;
      if (
        custom_options.code_message_show &&
        response.data &&
        response.data.code !== 0
      ) {
        message.error(`${response.data.message}`);
        return Promise.reject(response.data); // code不等于0, 页面具体逻辑就不执行了
      }

      return custom_options.reduct_data_format ? response.data : response;
    },
    (error) => {
      LoadingInstance._count = 0;
      error.config && removePending(error.config);
      custom_options.error_message_show && httpErrorStatusHandle(error); // 处理错误状态码
      return Promise.reject(error); // 错误继续返回给到具体页面
    },
  );

  return service(axiosConfig);
};

export default myAxios;

/**
 * 处理异常
 * @param {*} error
 */
const httpErrorStatusHandle = (error: AxiosError) => {
  // 处理被取消的请求
  if (axios.isCancel(error))
    return console.error('请求的重复请求：' + error.message);
  let messageStr = '';
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        messageStr = '接口重定向了！';
        break;
      case 400:
        messageStr = '参数不正确！';
        break;
      case 401:
        messageStr = '您未登录，或者登录已经超时，请先登录！';
        break;
      case 403:
        messageStr = '您没有权限操作！';
        break;
      case 404:
        messageStr = `请求地址出错: ${error.response.config.url}`;
        break; // 在正确域名下
      case 408:
        messageStr = '请求超时！';
        break;
      case 409:
        messageStr = '系统已存在相同数据！';
        break;
      case 500:
        messageStr = '服务器内部错误！';
        break;
      case 501:
        messageStr = '服务未实现！';
        break;
      case 502:
        messageStr = '网关错误！';
        break;
      case 503:
        messageStr = '服务不可用！';
        break;
      case 504:
        messageStr = '服务暂时无法访问，请稍后再试！';
        break;
      case 505:
        messageStr = 'HTTP版本不受支持！';
        break;
      default:
        messageStr = '异常问题，请联系管理员！';
        break;
    }
  }
  if (error.message.includes('timeout')) messageStr = '网络请求超时！';
  if (error.message.includes('Network'))
    messageStr = window.navigator.onLine ? '服务端异常！' : '您断网了！';

  message.error(messageStr);
};

/**
 * 储存每个请求的唯一cancel回调, 以此为标识
 * @param {*} config
 */
const addPending = (config: any) => {
  const pendingKey = getPendingKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel);
      }
    });
};

/**
 * 删除重复的请求
 * @param {*} config
 */
const removePending = (config: any) => {
  const pendingKey = getPendingKey(config);
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey);
    // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
    cancelToken(pendingKey);
    pendingMap.delete(pendingKey);
  }
};

/**
 * 生成唯一的每个请求的唯一key
 * @param {*} config
 * @returns
 */
const getPendingKey = (config: any) => {
  let { url, method, params, data } = config;
  if (typeof data === 'string') data = JSON.parse(data); // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&');
};
