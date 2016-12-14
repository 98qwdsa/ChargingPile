'use strict';

/**
 * @ngdoc constant
 * @name ChargingPile.API_ENDPOINT
 * @description
 * # API_ENDPOINT
 * Defines the API endpoint where our resources will make requests against.
 * Is used inside /services/ApiService.js to generate correct endpoint dynamically
 */


angular.module('ChargingPile')

  // development
  .constant('API_ENDPOINT', {
    host: 'http://localhost',
    postData :{
      apikey:'',
      datas:{}
    },

    registerRequestCaptcha:{
      url:'/registerRequestCaptcha',
      hint:['注册成功','用户已经存在,注册请求失败.','手机号码无效,注册请求失败.','其它错误']
    },
    register:{
      url:'/register',
      hint:['注册成功','用户已经存在,注册请求失败.','手机号码无效,注册请求失败.','其它错误']
    },

    resetKeyRequestCaptcha:{
      url:'/resetKeyRequestCaptcha',
      hint:['申请成功','服务器错误.','','其它错误']
    },
    resetKey:{
      url:'/resetKey',
      hint:['修改密码成功','验证码无效,注册失败.','','其它错误']
    },

    loginRequesCaptcha:{
      url:'/loginRequesCaptcha',
      hint:['成功','服务器错误','','','不存在的用户名','其它错误']
    },
    login:{
      url:'/login',
      hint:['登陆成功','服务器错误','密码错误','验证码错误']
    },

    signout:{
      url:'/loginOut',
      hint:['成功','服务器错误','不存在的用户名','验证码错误']
    },

    getUserChargeHistory:{
      url:'/getUserChargeHistory',
      hint:['申请成功','服务器错误','','其它错误']
    }


  });


  // live example with HTTP Basic Auth
  /*
  .constant('API_ENDPOINT', {
    host: 'http://yourserver.com',
    path: '/api/v2',
    needsAuth: true,
    username: 'whatever',
    password: 'foobar'
  });
  */

