"use strict";

Mock.mockjax = function (module) {
  var Item, error;
  Item = function () {
    function Item() {}

    Item.prototype.add = function (url) {
      var k, reg, v, _ref;
      _ref = Mock._mocked;
      for (k in _ref) {
        v = _ref[k];
        reg = null;
        if (/^\/.*\/$/.test(k)) {
          reg = eval(k);
        } else {
          reg = new RegExp(k);
        }
        if (reg.test(url)) {
          return Mock.mock(v.template);
        }
      }
    };

    return Item;
  }();
  try {
    return module.config(['$httpProvider', function ($httpProvider) {
      var item;
      item = new Item();
      return $httpProvider.interceptors.push(function () {
        return {
          request: function request(config) {
            var result;
            result = item.add(config.url);
            if (result) {
              config.original = {
                url: config.url,
                result: result,
                method: config.method,
                params: config.params,
                data: config.data
              };
              config.method = "GET";
              config.url = "?mockUrl=" + config.url;
            }
            return config;
          },
          response: function response(_response) {
            var original;
            original = _response.config.original;
            if (original) {
              _response.data = original.result;
            }
            return _response;
          }
        };
      });
    }]);
  } catch (_error) {
    error = _error;
    return console.error('生成mock.angular失败，例：var app = angular.module("app", []); Mock.mockjax(app);', error);
  }
};

'use strict';

/**
 * @ngdoc overview
 * @name ChargingPile
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

var ChargingPile = angular.module('ChargingPile', ['ionic', 'ngCordova', 'ngResource', 'oc.lazyLoad']);

Mock.mockjax(ChargingPile);

ChargingPile.run(["$ionicPlatform", function ($ionicPlatform) {
  window.BMap_loadScriptTime = new Date().getTime();

  $ionicPlatform.ready(function () {
    // save to use plugins here
  });

  // add possible global event handlers here
  // 

  Mock.mock('/registerRequestCaptcha', function (opt) {
    return {
      errorCode: Mock.mock('@natural(-3, 0)')
    };
  });

  Mock.mock('/register', function (opt) {
    return {
      errorCode: Mock.mock('@natural(-3, 0)')
    };
  });

  Mock.mock('/resetKeyRequestCaptcha', function (opt) {
    return {
      errorCode: Mock.mock({
        "array|1": ["0", "-1", "-3"]
      }).array
    };
  });
  Mock.mock('/resetKey', function (opt) {
    return {
      errorCode: Mock.mock({
        "array|1": ["0", "-1", "-3"]
      }).array
    };
  });

  Mock.mock('/loginRequesCaptcha', function (opt) {
    return {
      errorCode: Mock.mock({
        "array|1": ["0", "-1", "-4", "-5"]
      }).array
    };
  });

  Mock.mock('/login', function (opt) {
    return {
      errorCode: 0 //Mock.mock('@natural(-3, 0)')
    };
  });

  Mock.mock('/loginOut', function (opt) {
    return {
      errorCode: Mock.mock('@natural(-3, 0)')
    };
  });

  Mock.mock('/getUserChargeHistor', function (opt) {
    return {
      "return": [{
        "rid": 4555,
        "terminalid": "453453453453",
        "chargingPileID": "090098988985534",
        "gunid": 0,
        "orderid": "20167899887778",
        "orderState": 0,
        "BMSID": " LSJE12835",
        "VIN": "LSJE12835CS110420",
        "licensePlateNumber": "粤B67890",
        "startChargeSOC": "",
        "endChargeSOC": "",
        "accumulatedChargeElectricQuantity ": 34,
        "accumulatedChargeElectricEnergy ": 34,
        "chargeTime": Mock.mock('@integer(60, 100000)'),
        "chargeMode": 0,
        "chargeModeParameter": 4,
        "isNormalEnd": 3,
        "chargeProcessLog": [{
          "electricEnergy": 3,
          "time": 'ISODate("2016-04-26T01:42:51.263Z")'
        }, {
          "electricEnergy": 30,
          "time": 'ISODate("2016-04-26T01:42:51.263Z")'
        }],
        "chargeStartTime": Mock.mock('@datetime()'),
        "chargeEndTime": Mock.mock('@datetime()'),
        "orderStartTime": Mock.mock('@datetime()'),
        "startMeterValue": 3333,
        "endMeterValue": 44444,
        "payment": 50.5,
        "paymentRemark": "服务费：4，电费：50，车位费：10"
      }],

      "errorCode": Mock.mock({
        "array|1": ["0"
        /*,
                      "-1",
                      "-3"*/
        ]
      }).array
    };
  });

  Mock.mock('/getUserRechargeHistory', function (opt) {
    return {
      "return": [{
        "orderid": Mock.mock('@string("number", 9)'),
        "orderidState": Mock.mock('@natural(0, 3)'),
        "rechargeMoney": Mock.mock('@integer(100,1000)'),
        "thirdPartyOrderID": Mock.mock('@string("number", 9)'),
        "rechargeStartTime": Mock.mock('@datetime()'),
        "rechargeArriveTime": Mock.mock('@datetime()')
      }],
      "errorCode": Mock.mock({
        "array|1": ["0"
        /*,
                      "-1",
                      "-3"*/
        ]
      }).array
    };
  });

  Mock.mock('/getChargingStationsInfo', function (opt) {
    return {
      "return": [{
        "rid": Mock.mock('@string("number", 5)'),
        "longitude": Mock.mock('@float(10, 99, 6)'),
        "latitude": Mock.mock('@float(10, 99, 6)'),
        "distance": Mock.mock('@natural(1, 50)'),
        "addr": Mock.mock('@ctitle()'),
        "ownChargingPile": {
          "fast": Mock.mock('@natural(1, 20)'),
          "slow": Mock.mock('@natural(1, 20)')
        },
        "spare": Mock.mock('@natural(1, 20)'),
        "serviceTime": Mock.mock('@time') + '-' + Mock.mock('@time'),
        "servicePhone": Mock.mock('@string("number", 8)'),
        "cost": {
          "parking": [{
            "start": Mock.mock('@datetime()'),
            "end": Mock.mock('@datetime()'),
            "cost": Mock.mock('@string("number", 2)')
          }],
          "service": Mock.mock('@float(1,4,2,3)'),
          "electricity": [{
            "start": Mock.mock('@datetime()'),
            "end": Mock.mock('@datetime()'),
            "cost": Mock.mock('@float(1, 2, 2)')
          }]
        },
        "operator": Mock.mock('@ctitle()')
      }],
      "errorCode": Mock.mock({
        "array|1": ["0"
        /*,
                      "-1",
                      "-3"*/
        ]
      }).array

    };
  });

  Mock.mock('/getChargingPileInfo', function (opt) {
    return {
      "return": [{
        "rid": Mock.mock('@string("number", 5)'),
        "terminalid": Mock.mock('@string("number", 12)'),
        "terminalType": Mock.mock('@ctitle()'),
        "parkingSpace": Mock.mock('@natural(1, 50)'),
        "state": Mock.mock('@natural(0, 4)'),
        "interface": Mock.mock('@ctitle()')
      }],
      "errorCode": Mock.mock({
        "array|1": ["0"
        /*,
                      "-1",
                      "-3"*/
        ]
      }).array
    };
  });

  Mock.mock('/getUserDetailInfo', function (opt) {
    return {
      "return": {
        "userid": "1212121212",
        "name": "昵称",
        "grade": 0,
        "motorVehicle": [{
          "VIN": "LSJE12835CS110420",
          "licensePlateNumber": "粤B67890",
          "carType": 0,
          "carMode": "秦",
          "chassisNumber": "23322",
          "engineNumber": "5566552"
        }],
        "purse": {
          "balance": 100,
          "voucher": 50,
          "coupon": 50
        },
        "loginKey": "1212121212",
        "payKey": "1212121212",
        "isEnable": true,
        "creatTime": Mock.mock('@datetime()'),
        "lastLoginTime": Mock.mock('@datetime()')
      },
      "errorCode": Mock.mock({
        "array|1": ["0"
        /*,
                      "-1",
                      "-3"*/
        ]
      }).array
    };
  });

  Mock.mock('/setUserInfo', function (opt) {
    return {
      errorCode: Mock.mock({
        "array|1": ["0", "-1", "-3"]
      }).array
    };
  });
}]).config(["$httpProvider", "$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", function ($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  // register $http interceptors, if any. e.g.
  // $httpProvider.interceptors.push('interceptor-name');

  // Application routing
  $stateProvider.state('signin', {
    url: '/signin',
    cache: true,
    templateUrl: 'templates/views/signin.html',
    controller: 'SigninController'
  }).state('regist', {
    url: '/regist',
    cache: true,
    templateUrl: 'templates/views/regist.html',
    controller: 'RegistController'
  }).state('reset', {
    url: '/reset',
    cache: true,
    templateUrl: 'templates/views/reset.html',
    controller: 'ResetKeyController'
  }).state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/main.html',
    controller: 'MainController'
  }).state('app.home', {
    url: '/home',
    cache: true,
    views: {
      'home': {
        templateUrl: 'templates/views/home.html',
        controller: 'HomeController'
      }
    }
  }).state('app.searchChargeStation', {
    url: '/searchChargeStation',
    cache: true,
    views: {
      'home': {
        templateUrl: 'templates/views/searchChargeStation.html',
        controller: 'SearchChargeStationController'
      }
    }
  }).state('app.chargeStationInfo', {
    url: '/chargeStationInfo/:id',
    cache: true,
    views: {
      'home': {
        templateUrl: 'templates/views/chargeStation.html',
        controller: 'ChargeStationController'
      }
    }
  }).state('app.searchChargingPile', {
    url: '/searchChargingPile/:id',
    cache: true,
    views: {
      'home': {
        templateUrl: 'templates/views/searchChargingPile.html',
        controller: 'SearchChargingPileController'
      }
    }
  }).state('app.navigation', {
    url: '/navigation',
    cache: true,
    views: {
      'home': {
        templateUrl: 'templates/views/navigation.html',
        controller: 'NavigationController'
      }
    }
  }).state('app.me', {
    url: '/me',
    cache: true,
    views: {
      'me': {
        templateUrl: 'templates/views/me.html'
      }
    }
  }).state('app.reChargeHistory', {
    url: '/rechargeHistory',
    cache: true,
    views: {
      'me': {
        templateUrl: 'templates/views/rechargeHistory.html',
        controller: 'RechargeHistoryController'
      }
    }
  }).state('app.myCar', {
    url: '/myCar',
    cache: true,
    views: {
      'me': {
        templateUrl: 'templates/views/myCar.html',
        controller: 'MyCarPileController'
      }
    }
  }).state('app.addCar', {
    url: '/addCar',
    cache: true,
    views: {
      'me': {
        templateUrl: 'templates/views/addCar.html',
        controller: 'AddCarController'
      }
    }
  }).state('app.chargeHistory', {
    url: '/chargeHistory',
    cache: true,
    views: {
      'me': {
        templateUrl: 'templates/views/chargeHistory.html',
        controller: 'ChargeHistoryController'
      }
    }
  }).state('app.settings', {
    url: '/settings',
    cache: true,
    views: {
      'viewContent': {
        templateUrl: 'templates/views/settings.html',
        controller: 'SettingsController'
      }
    }
  });

  // redirects to default route for undefined routes
  $urlRouterProvider.otherwise('/app/home');
}]);
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
  postData: {
    apikey: '',
    datas: {}
  },

  registerRequestCaptcha: {
    url: '/registerRequestCaptcha',
    hint: ['注册成功', '用户已经存在,注册请求失败.', '手机号码无效,注册请求失败.', '其它错误']
  },
  register: {
    url: '/register',
    hint: ['注册成功', '用户已经存在,注册请求失败.', '手机号码无效,注册请求失败.', '其它错误']
  },

  resetKeyRequestCaptcha: {
    url: '/resetKeyRequestCaptcha',
    hint: ['申请成功', '服务器错误.', '', '其它错误']
  },
  resetKey: {
    url: '/resetKey',
    hint: ['修改密码成功', '验证码无效,注册失败.', '', '其它错误']
  },

  loginRequesCaptcha: {
    url: '/loginRequesCaptcha',
    hint: ['成功', '服务器错误', '', '', '不存在的用户名', '其它错误']
  },
  login: {
    url: '/login',
    hint: ['登陆成功', '服务器错误', '密码错误', '验证码错误']
  },

  signout: {
    url: '/loginOut',
    hint: ['成功', '服务器错误', '不存在的用户名', '验证码错误']
  },

  getUserChargeHistory: {
    url: '/getUserChargeHistory',
    hint: ['申请成功', '服务器错误', '', '其它错误']
  },

  getUserRechargeHistory: {
    url: '/getUserRechargeHistory',
    hint: ['申请成功', '服务器错误', '', '其它错误']
  },

  getChargingStationsInfo: {
    url: '/getChargingStationsInfo',
    hint: ['申请成功', '服务器错误', '', '其它错误']
  },

  getChargingPileInfo: {
    url: '/getChargingPileInfo',
    hint: ['申请成功', '服务器错误', '', '其它错误']
  },

  getUserDetailInfo: {
    url: '/getUserDetailInfo',
    hint: ['申请成功', '服务器错误', '', '其它错误']
  },

  setUserInfo: {
    url: '/setUserInfo',
    hint: ['申请成功', '服务器错误', '', '其它错误']
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

'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.util:lodash
 * @description
 * # Lo-Dash
 * Expose Lo-Dash through injectable factory, so we don't pollute / rely on global namespace
 * just inject lodash as _
 */

angular.module('ChargingPile').factory('_', ["$window", function ($window) {
  return $window._;
}]);

'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('AddCarController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

  $scope.carInfo = {
    "VIN": "",
    "licensePlateNumber": "",
    "carType": 0,
    "carMode": "",
    "chassisNumber": "",
    "engineNumber": ""
  };

  var addCarParams = {
    "userid": "13890098909",
    "userKey": "KDNEJDANDFKAYSDFASDFKSDFASDLFI",
    "object": {
      "motorVehicle": []
    }

  };

  $scope.addCar = function () {
    addCarParams.object.motorVehicle = [$scope.carInfo];

    API_ENDPOINT.postData.datas = addCarParams;

    console.log(API_ENDPOINT.postData);

    $http.post(API_ENDPOINT.host + API_ENDPOINT.setUserInfo.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.setUserInfo.hint[code]
      });

      if (0 === code) {
        $scope.$broadcast('scroll.refreshComplete');
      }
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('ChargeHistoryController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

  var getUserChargeHistoryParam = {
    userid: 13420989008
  };

  $scope.orderState = ['用户已经预约电桩等待用户充电', '充电进行中', '充电中断等待恢复', '正常完成充电，交易结算'];

  API_ENDPOINT.postData.datas = getUserChargeHistoryParam;
  $scope.doRefresh = function () {
    $http.post(API_ENDPOINT.host + API_ENDPOINT.getUserChargeHistory.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      if (0 === code) {
        if ($scope.chargeHistory) {
          $scope.chargeHistory = data.data.return.concat($scope.chargeHistory);
        } else {
          $scope.chargeHistory = data.data.return;
        }
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.getUserChargeHistory.hint[code]
        });
      }
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.doRefresh();
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('ChargeStationController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
  var getChargingStationsInfoParam = {
    userid: 13420989008
  };

  API_ENDPOINT.postData.datas = getChargingStationsInfoParam;

  $http.post(API_ENDPOINT.host + API_ENDPOINT.getChargingStationsInfo.url, API_ENDPOINT.postData).then(function (data) {
    var code = Math.abs(data.data.errorCode);

    if (0 === code) {
      $scope.ChargingStationsInfo = data.data.return[0];
      $scope.$broadcast('scroll.refreshComplete');
    } else {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.getChargingStationsInfo.hint[code]
      });
    }
  }, function (error) {
    var alertPopup = $ionicPopup.alert({
      //title: CALLBACKTANS.registerRequestCaptcha[code],
      template: angular.toJson(error)
    });
  });
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('HomeController', ["$scope", "ExampleService", function ($scope, ExampleService) {}]);

'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:MainController
 * @description
 * # MainController
 */
angular.module('ChargingPile').controller('MainController', ["$scope", function ($scope) {

  // do something with $scope

}]);

'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:MainController
 * @description
 * # MainController
 */
angular.module('ChargingPile').controller('MyCarPileController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

  // do something with $scope
  var getUserDetailInfoParam = {
    "userid": "13890098909",
    "userKey": "KDNEJDANDFKAYSDFASDFKSDFASDLFI"
  };

  API_ENDPOINT.postData.datas = getUserDetailInfoParam;

  $http.post(API_ENDPOINT.host + API_ENDPOINT.getUserDetailInfo.url, API_ENDPOINT.postData).then(function (data) {
    var code = Math.abs(data.data.errorCode);

    if (0 === code) {
      $scope.myCarList = data.data.return.motorVehicle;
      $scope.$broadcast('scroll.refreshComplete');
    } else {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.getUserDetailInfo.hint[code]
      });
    }
  }, function (error) {
    var alertPopup = $ionicPopup.alert({
      //title: CALLBACKTANS.registerRequestCaptcha[code],
      template: angular.toJson(error)
    });
  });
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('NavigationController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", "$cordovaGeolocation", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN, $cordovaGeolocation) {
  var posOptions = { timeout: 10000, enableHighAccuracy: false };
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    var map = new BMap.Map("allmap"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(position.coords.longitude, position.coords.latitude), 14);
    console.log(position.coords.longitude, position.coords.latitude); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.setCurrentCity("深圳"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  }, function (err) {
    // error
  });
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('RechargeHistoryController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

  var getUserRechargeHistoryParam = {
    userid: 13420989008
  };

  $scope.orderidState = ['用户申请充值', '第三方充值平台处理中(微信,支付宝)', '第三方充值平台处理完成,正在充值中', '充值完成'];

  API_ENDPOINT.postData.datas = getUserRechargeHistoryParam;
  $scope.doRefresh = function () {
    $http.post(API_ENDPOINT.host + API_ENDPOINT.getUserRechargeHistory.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      if (0 === code) {
        if ($scope.reChargeHistory) {
          $scope.reChargeHistory = data.data.return.concat($scope.reChargeHistory);
        } else {
          $scope.reChargeHistory = data.data.return;
        }
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.getUserRechargeHistory.hint[code]
        });
      }
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.doRefresh();
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('RegistController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
  var registerParam = {
    userid: '',
    userKey: '',
    mobile: '',
    captcha: ''
  };

  $scope.param = registerParam;

  $scope.registerRequestCaptcha = function () {

    var captchaParam = {
      userid: '',
      userKey: '',
      mobile: ''
    };

    FN.getQueryParam(captchaParam, $scope.param);
    API_ENDPOINT.postData.datas = captchaParam;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.registerRequestCaptcha.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.registerRequestCaptcha.hint[code]
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.register = function () {

    FN.getQueryParam(registerParam, $scope.param);

    API_ENDPOINT.postData.datas = registerParam;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.register.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.register.hint[code]
      });
      alertPopup.then(function (res) {
        if (code === 0) {
          $state.go('app.login');
        }
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('ResetKeyController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

  var resetKeyParams = {
    userid: '',
    userKey: '',
    captcha: ''
  };

  $scope.param = resetKeyParams;

  $scope.resetKeyRequestCaptcha = function () {

    var captchaParam = {
      userid: ''
    };

    FN.getQueryParam(captchaParam, $scope.param);
    API_ENDPOINT.postData.datas = captchaParam;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.resetKeyRequestCaptcha.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.resetKeyRequestCaptcha.hint[code]
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.resetKey = function () {
    FN.getQueryParam(resetKeyParams, $scope.param);

    API_ENDPOINT.postData.datas = resetKeyParams;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.resetKey.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.resetKey.hint[code]
      });
      alertPopup.then(function (res) {
        if (code === 0) {
          $state.go('app.login');
        }
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('SearchChargeStationController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
  var getChargingStationsListParam = {
    "city": "深圳",
    "mode": "dim/place",
    "keyword": "直流",
    "longitude": 34.343434324,
    "latitude": 45.434534534,
    "distance": 10
  };

  API_ENDPOINT.postData.datas = getChargingStationsListParam;
  $scope.doRefresh = function () {
    $http.post(API_ENDPOINT.host + API_ENDPOINT.getChargingStationsInfo.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      if (0 === code) {
        if ($scope.chargeStationList) {
          $scope.chargeStationList = data.data.return.concat($scope.chargeStationList);
        } else {
          $scope.chargeStationList = data.data.return;
        }
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.getChargingStationsInfo.hint[code]
        });
      }
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.doRefresh();
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('SearchChargingPileController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
  $scope.chargeingStationId = $state.params.id;

  var getChargingPileListParam = {
    rid: 13420989008
  };

  API_ENDPOINT.postData.datas = getChargingPileListParam;
  $scope.doRefresh = function () {
    $http.post(API_ENDPOINT.host + API_ENDPOINT.getChargingPileInfo.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      if (0 === code) {
        if ($scope.chargePileList) {
          $scope.chargePileList = data.data.return.concat($scope.chargePileList);
        } else {
          $scope.chargePileList = data.data.return;
        }
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.getChargingPileInfo.hint[code]
        });
      }
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.doRefresh();
}]);
'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:SettingsController
 * @description
 * # SettingsController
 */
angular.module('ChargingPile').controller('SettingsController', ["$scope", function ($scope) {

  // do something with $scope

}]);

'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile').controller('SigninController', ["$scope", "$state", "$http", "$ionicPopup", "API_ENDPOINT", "FN", function ($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

  var loginParams = {
    userid: '',
    userKey: '',
    captcha: ''
  };

  $scope.param = loginParams;

  $scope.loginRequesCaptcha = function () {
    var captchaParam = {
      userid: ''
    };

    FN.getQueryParam(captchaParam, $scope.param);
    API_ENDPOINT.postData.datas = captchaParam;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.loginRequesCaptcha.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.loginRequesCaptcha.hint[code]
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.signin = function () {
    FN.getQueryParam(loginParams, $scope.param);

    API_ENDPOINT.postData.datas = loginParams;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.login.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.login.hint[code]
      });
      alertPopup.then(function (res) {
        if (code === 0) {
          $state.go('app.home');
        }
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.signout = function () {
    var signoutParam = {
      userid: ''
    };

    FN.getQueryParam(signoutParam, $scope.param);
    API_ENDPOINT.postData.datas = signoutParam;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.signout.url, API_ENDPOINT.postData).then(function (data) {
      var code = Math.abs(data.data.errorCode);

      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: API_ENDPOINT.signout.hint[code]
      });
    }, function (error) {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error)
      });
    });
  };

  $scope.gotoResetKey = function () {
    $state.go('reset');
  };

  $scope.gotoRegister = function () {
    $state.go('regist');
  };
}]);
'use strict';

/**
 * @ngdoc service
 * @name ChargingPile.ApiService
 * @description
 * # ApiService
 * Retrieves correct api to make requests against.
 * Uses settings from API_ENDPOINT defined in /config/apiEndpoint.js
 *
 * Usage example: $http({
 *                      url: ApiService.getEndPoint() + '/things',
 *                      method: 'GET'
 *                 })
 *
 */
angular.module('ChargingPile').factory('ApiService', ["$window", "$http", "API_ENDPOINT", function ($window, $http, API_ENDPOINT) {

  var _api = API_ENDPOINT;
  var endpoint = _api.port ? _api.host + ':' + _api.port + _api.path : _api.host + _api.path;

  // activate for basic auth
  if (_api.needsAuth) {
    $http.defaults.headers.common.Authorization = 'Basic ' + $window.btoa(_api.username + ':' + _api.password);
  }

  // public api
  return {
    getEndpoint: function getEndpoint() {
      return endpoint;
    }
  };
}]);

'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.service:ExampleService
 * @description
 * # ExampleService
 */
angular.module('ChargingPile')
// use factory for services
.factory('ExampleService', ["$http", "$timeout", "$q", function ($http, $timeout, $q) {

  var kindOfPrivateVariable = 42;

  var doSomethingAsync = function doSomethingAsync() {
    var deferred = $q.defer();
    $timeout(deferred.resolve.bind(null, kindOfPrivateVariable), 1000);
    return deferred.promise;
  };

  var fetchSomethingFromServer = function fetchSomethingFromServer() {
    return $http({
      url: 'http://hipsterjesus.com/api',
      params: {
        paras: 2
      },
      method: 'GET'
    }).success(function (data) {
      console.log('fetched this stuff from server:', data);
    }).error(function (error) {
      console.log('an error occured', error);
    });
  };

  // public api
  return {
    doSomethingAsync: doSomethingAsync,
    fetchSomethingFromServer: fetchSomethingFromServer
  };
}]);

'use strict';

angular.module('ChargingPile').factory('FN', function () {

  var getQueryParam = function getQueryParam(tag, source) {
    var overwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var setValue = function setValue(i) {
      if (overwrite) {
        tag[i] = source[i];
      } else {
        if ('' === tag[i]) {
          tag[i] = source[i];
        }
      }
    };

    for (var i in tag) {
      if (angular.isString(source[i]) && '' !== source[i]) {
        setValue(i);
      }
    }
  };

  return {
    getQueryParam: getQueryParam
  };
});
angular.module("ChargingPile").run(["$templateCache", function ($templateCache) {
  $templateCache.put("templates/main.html", "  <ion-tabs class=\"tabs-positive tabs-icon-top\">\r\n    <ion-tab title=\"首页\" icon-on=\"ion-ios-home\" icon-off=\"ion-ios-home-outline\" ui-sref=\"app.home\"><!--ng-click=\"tabRefresh(0)\"   ui-sref=\"tab.discovery\"-->\r\n      <ion-nav-view name=\"home\"></ion-nav-view>\r\n    </ion-tab>\r\n    <!-- Chats Tab -->\r\n    <ion-tab title=\"我\" icon-on=\"ion-ios-person\" icon-off=\"ion-ios-person-outline\" ui-sref=\"app.me\">\r\n      <ion-nav-view name=\"me\"></ion-nav-view>\r\n    </ion-tab>\r\n  </ion-tabs>");
  $templateCache.put("templates/views/addCar.html", "<ion-view view-title=\"添加车辆\">\r\n    <ion-content>\r\n      <ion-list>\r\n        <ion-item>\r\n          号牌类型:\r\n          <select ng-model=\"carInfo.carType\">\r\n            <option value=\"0\">小型汽车</option>\r\n            <option value=\"1\">大型汽车</option>\r\n          </select>\r\n        </ion-item>\r\n        <ion-item class=\"item-divider\"></ion-item>\r\n        <ion-item class=\"item-icon-right\">\r\n          车型:\r\n          <input type=\"text\" placeholder=\"请选择车型\" ng-model=\"carInfo.carMode\">\r\n          <i class=\"icon ion-ios-arrow-right\"></i>\r\n        </ion-item>\r\n        <ion-item class=\"item-divider\"></ion-item>\r\n        <ion-item class=\"item-icon-right\">\r\n          车牌号码:\r\n          <input type=\"text\" ng-model=\"carInfo.licensePlateNumber\">\r\n          <!-- <i class=\"icon ion-ios-arrow-right\"></i> -->\r\n        </ion-item>\r\n        <ion-item class=\"item-divider\"></ion-item>\r\n        <ion-item class=\"item-icon-right\">\r\n          发动机号:\r\n          <input type=\"text\" ng-model=\"carInfo.engineNumber\">\r\n          <i class=\"icon ion-ios-help-outline\"></i>\r\n        </ion-item>\r\n        <ion-item class=\"item-divider\"></ion-item>\r\n        <ion-item class=\"item-icon-right\">\r\n          车架号码:\r\n          <input type=\"text\" ng-model=\"carInfo.chassisNumber\">\r\n          <i class=\"icon ion-ios-help-outline\"></i>\r\n        </ion-item>\r\n        <button class=\"button button-full button-positive\" ng-click=\"addCar();\">确认</button>\r\n\r\n      </ion-list>\r\n    </ion-content>\r\n\r\n\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/chargeHistory.html", "<ion-view view-title=\"充电记录\">\r\n    <ion-content>\r\n        <ion-refresher pulling-text=\"下拉刷新...\" on-refresh=\"doRefresh()\"></ion-refresher>\r\n        <ion-list class=\"chargeHistory\">\r\n          <ion-item ng-repeat-start=\"i in chargeHistory\">\r\n            <div class=\"left flt-l\">\r\n              <img src=\"\">\r\n              <p>{{i.rid}}</p>\r\n            </div>\r\n            <div class=\"right\">\r\n              <ion-list>\r\n                <ion-item>\r\n                  订单编号:{{i.orderid}}\r\n                </ion-item>\r\n                <ion-item>\r\n                  订单开始时间:{{i.orderStartTime}}\r\n                </ion-item>\r\n                <ion-item>\r\n                订单状态:{{orderState[i.orderState]}}\r\n                </ion-item>\r\n                <ion-item>\r\n                车牌号码:{{i.licensePlateNumber}}\r\n                </ion-item>\r\n                <ion-item>\r\n                开始时间:{{i.chargeStartTime}}\r\n                </ion-item>\r\n                <ion-item>\r\n                 结束时间:{{i.chargeEndTime}}                \r\n                </ion-item>\r\n                <ion-item>\r\n                总时长:{{i.chargeTime}} / 总花费:{{i.payment}}元\r\n                </ion-item>\r\n              </ion-list>\r\n            </div>\r\n          </ion-item>\r\n          <ion-item ng-repeat-end class=\"item-divider\" ng-if=\"!$last\"></ion-item>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>");
  $templateCache.put("templates/views/chargeStation.html", "<ion-view>\r\n  <ion-nav-title side=\"center\">\r\n    <span>电站详情</span>/<span ui-sref=\'app.searchChargingPile({id:ChargingStationsInfo.rid})\'>充电终端</span>\r\n  </ion-nav-title>\r\n    <ion-content>\r\n      <ion-list>\r\n        <ion-item class=\"item-thumbnail-left\">\r\n          <img src=\"cover.jpg\">\r\n          <h2>{{ChargingStationsInfo.operator}}</h2>      \r\n        </ion-item>\r\n        <ion-item>\r\n          <h2><i>慢</i>空闲{{ChargingStationsInfo.spare}}/共{{ChargingStationsInfo.ownChargingPile.fast}}<i>快</i>空闲{{ChargingStationsInfo.spare}}/共{{ChargingStationsInfo.ownChargingPile.slow}}</h2>\r\n        </ion-item>\r\n        <ion-item class=\"item-divider\"></ion-item>\r\n        <ion-item class=\"item-icon-left item-icon-right\">\r\n          <h2>{{ChargingStationsInfo.addr}}</h2>\r\n          <p>距您{{ChargingStationsInfo.distance}}km</p>\r\n          <i class=\"icon ion-navigate\" ui-sref=\"app.navigation\"></i>\r\n        </ion-item>\r\n        <ion-item class=\"item-divider\"></ion-item>\r\n        <ion-item>\r\n          <span>充电单价</span>\r\n          {{ChargingStationsInfo.cost.service}}元/度\r\n        </ion-item>\r\n        <ion-item>\r\n          <span>停车费</span>\r\n          {{ChargingStationsInfo.cost.parking[0].cost}}元/小时\r\n        </ion-item>\r\n        <ion-item>\r\n          <span>运营商</span>\r\n          {{ChargingStationsInfo.operator}}\r\n        </ion-item>\r\n        <ion-item>\r\n          <span>营业时间</span>\r\n          {{ChargingStationsInfo.serviceTime}}\r\n        </ion-item>\r\n        <ion-item class=\"item-icon-right\">\r\n          <span>服务电话</span>\r\n          {{ChargingStationsInfo.servicePhone}}\r\n        <a class=\"icon ion-ios-telephone-outline\"></a>\r\n        </ion-item>\r\n      </ion-list>\r\n    </ion-content>\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/home.html", "<ion-view view-title=\"首页\">\r\n\r\n        <ion-content class=\"content\">\r\n            <div class=\"imgs\">          \r\n            </div>\r\n            <ul class=\"img-nav\">\r\n                <li ui-sref=\"app.searchChargeStation\">\r\n                    <img src=\"\">\r\n                    电站搜索\r\n                </li>\r\n                <li ui-sref=\"app.searchChargeStation\">\r\n                    <img src=\"\">\r\n                    我的收藏\r\n                </li>\r\n                <!-- <li ui-sref=\"app.chargeHistory\">             \r\n                    <img src=\"\">\r\n                    最近充电\r\n                </li> -->\r\n                <!-- <li>\r\n                    <img src=\"\">\r\n                    充电地图\r\n                </li>\r\n                <li>\r\n                    <img src=\"\">\r\n                    一键导航\r\n                </li> -->\r\n            </ul>\r\n        </ion-content>\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/me.html", " <ion-view view-title=\"我\">\r\n <ion-content class=\"content\">\r\n        <div class=\"imgs\">\r\n            <div class=\"me-login\">\r\n                登录/注册\r\n            </div>          \r\n        </div>\r\n        <ion-list>\r\n          <ion-item class=\"item item-icon-left\">\r\n            <i class=\"icon ion-card\"></i>\r\n            我的钱包\r\n          </ion-item>\r\n          <ion-item class=\"item-icon-left\">\r\n               余额:\r\n               代金券:\r\n               优惠券:\r\n          </ion-item>\r\n          <ion-item class=\"item-divider\"></ion-item>\r\n          <ion-item class=\"item-icon-left\" ui-sref=\"app.chargeHistory\">\r\n                <i class=\"icon ion-clipboard\"></i>\r\n                充电历史\r\n          </ion-item>\r\n          <ion-item class=\"item-icon-left\" ui-sref=\"app.reChargeHistory\">\r\n                <i class=\"icon ion-printer\"></i>\r\n                充值历史\r\n          </ion-item>\r\n          <ion-item class=\"item-divider\"></ion-item>\r\n          <ion-item class=\"item-icon-left\" ui-sref=\"app.myCar\">\r\n                <i class=\"icon ion-model-s\"></i>\r\n                我的爱车\r\n          </ion-item>\r\n          <!-- <ion-item class=\"item-icon-left\">\r\n                <i class=\"icon ion-ios-star\"></i>\r\n                我的收藏\r\n          </ion-item>\r\n          <ion-item class=\"item-icon-left\">\r\n                <i class=\"icon ion-chatbox-working\"></i>\r\n                我的评论\r\n          </ion-item>\r\n          <ion-item class=\"item-icon-left\">\r\n                <i class=\"icon ion-chatboxes\"></i>\r\n                我的社区\r\n          </ion-item>\r\n          <ion-item class=\"item-divider\"></ion-item>\r\n          <ion-item class=\"item-icon-left\">\r\n                <i class=\"icon ion-gear-b\"></i>\r\n                设置\r\n          </ion-item> -->\r\n        </ion-list>\r\n       </ion-content>\r\n     </ion-view>");
  $templateCache.put("templates/views/myCar.html", "<ion-view view-title=\"我的爱车\">\r\n      <ion-content>\r\n        <ion-list>\r\n          <ion-item ng-repeat-start=\"i in myCarList\">\r\n            <h2><span>VIN</span>{{i.VIN}}</h2>\r\n            <h2><span>licensePlateNumber</span>{{i.licensePlateNumber}}</h2>\r\n            <h2><span>carType</span>{{i.carType}}</h2>\r\n            <h2><span>carMode</span>{{i.carMode}}</h2>\r\n            <h2><span>chassisNumber</span>{{i.chassisNumber}}</h2>\r\n            <h2><span>engineNumber</span>{{i.engineNumber}}</h2>\r\n          </ion-item>\r\n          <ion-item ng-repeat-end class=\"item-divider\"></ion-item>\r\n          <button class=\"button button-full button-positive\" ui-sref=\"app.addCar\">添加新车</button>\r\n        </ion-list>\r\n      </ion-content>\r\n\r\n\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/navigation.html", "\r\n<ion-view view-title=\"地图导航\"> \r\n      <div id=\"allmap\" style=\"height:100%; margin:44px 0;\"></div>\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/rechargeHistory.html", "<ion-view view-title=\"充值记录\">\r\n    <ion-content>\r\n        <ion-refresher pulling-text=\"下拉刷新...\" on-refresh=\"doRefresh()\"></ion-refresher>\r\n        <ion-list class=\"chargeHistory\">\r\n          <ion-item ng-repeat-start=\"i in reChargeHistory\">\r\n              <ion-list>\r\n                <ion-item>\r\n                  充值订单号:{{i.orderid}}\r\n                </ion-item>\r\n                <ion-item>\r\n                  充值订单状态:{{orderidState[i.orderidState]}}\r\n                </ion-item>\r\n                <ion-item>\r\n                  充值金额:{{i.rechargeMoney}}\r\n                </ion-item>\r\n                <ion-item>\r\n                  第三方充值平台的订单号:{{i.thirdPartyOrderID}}\r\n                </ion-item>\r\n                <ion-item>\r\n                 充值申请时间:{{i.rechargeStartTime}}                \r\n                </ion-item>\r\n                <ion-item>\r\n                  充值到账时间:{{i.rechargeArriveTime}}\r\n                </ion-item>\r\n              </ion-list>\r\n          </ion-item>\r\n          <ion-item ng-repeat-end class=\"item-divider\" ng-if=\"!$last\"></ion-item>\r\n        </ion-list>\r\n    </ion-content>\r\n</ion-view>");
  $templateCache.put("templates/views/regist.html", "<ion-view view-title=\"注册\">\r\n    <!-- <ion-header-bar align-title=\"center\" class=\"bar-positive\">\r\n    <button class=\"button button-icon icon ion-navicon\" menu-toggle=\"left\"></button>\r\n        <h1 class=\"title\">注册</h1>\r\n    </ion-header-bar> -->\r\n\r\n    <ion-content>\r\n      <div class=\"list list-inset\">\r\n        <label class=\"item item-input\">\r\n          <input type=\"text\" placeholder=\"用户名\" ng-model=\"param.userid\">\r\n        </label>\r\n        <label class=\"item item-input\">\r\n          <input type=\"password\" placeholder=\"密码\" ng-model=\"param.userKey\">\r\n        </label>\r\n        <label class=\"item item-input\">\r\n          <input type=\"number\" placeholder=\"电话号码\" ng-model=\"param.mobile\">\r\n        </label>\r\n        <div class=\"item item-input-inset\">\r\n          <label class=\"item-input-wrapper\">\r\n            <input type=\"number\" placeholder=\"验证码\" ng-model=\"param.captcha\">\r\n          </label>\r\n          <button class=\"button button-small button-positive\" ng-click=\"registerRequestCaptcha();\">\r\n            发送验证码\r\n          </button>\r\n        </div>\r\n        <button class=\"button button-full button-positive\" ng-click=\"register()\">\r\n          注册\r\n        </button>\r\n      </div>\r\n\r\n    </ion-content>\r\n\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/reset.html", "<ion-view view-title=\"修改密码\">\r\n    <!-- <ion-header-bar align-title=\"center\" class=\"bar-positive\">\r\n    <button class=\"button button-icon icon ion-navicon\" menu-toggle=\"left\"></button>\r\n        <h1 class=\"title\"></h1>\r\n    </ion-header-bar> -->\r\n\r\n    <ion-content>\r\n      <div class=\"list list-inset\">\r\n        <label class=\"item item-input\">\r\n          <input type=\"text\" placeholder=\"账号\" ng-model=\"param.userid\">\r\n        </label>\r\n        <label class=\"item item-input\">\r\n          <input type=\"password\" placeholder=\"新密码\" ng-model=\"param.userKey\">\r\n        </label>\r\n         <label class=\"item item-input\">\r\n          <input type=\"password\" placeholder=\"重复密码\">\r\n        </label>\r\n        <div class=\"item item-input-inset\">\r\n          <label class=\"item-input-wrapper\">\r\n            <input type=\"number\" placeholder=\"验证码\" ng-model=\"param.captcha\">\r\n          </label>\r\n          <button class=\"button button-small button-positive\" ng-click=\"resetKeyRequestCaptcha();\">\r\n            发送验证码\r\n          </button>\r\n        </div>\r\n        <button class=\"button button-full button-positive\" ng-click=\"resetKey();\">\r\n          确认\r\n        </button>\r\n      </div>\r\n\r\n    </ion-content>\r\n\r\n</ion-view>\r\n\r\n");
  $templateCache.put("templates/views/searchChargeStation.html", "<ion-view view-title=\"充电站\">\r\n    <ion-content>\r\n      <ion-refresher pulling-text=\"下拉刷新...\" on-refresh=\"doRefresh()\"></ion-refresher>\r\n      <ion-list class=\"charge-station-list\">\r\n        <ion-item>\r\n          <select>\r\n            <option>深圳</option>\r\n          </select>\r\n          <select>\r\n            <option value=\"1\">1km</option>\r\n            <option value=\"5\">5km</option>\r\n            <option value=\"10\">10km</option>\r\n            <option value=\"50\">50km</option>\r\n          </select>\r\n        </ion-item>\r\n        <ion-item ng-repeat-start=\"i in chargeStationList\" ui-sref=\"app.chargeStationInfo({id:i.rid})\" class=\"item-thumbnail-left item-icon-right\">\r\n          <img src=\"cover.jpg\">\r\n          <h2>{{i.operator}}<i class=\"flt-r slow\">慢</i><i class=\"flt-r fast\">快</i></h2>\r\n          <p>{{i.cost.service}}元/度</p>\r\n          <p>距您{{i.distance}}km</p>\r\n          <h2>空闲{{i.spare}}</h2>\r\n        </ion-item>\r\n        <ion-item ng-repeat-end class=\"item-divider\"></ion-item>\r\n      </ion-list>\r\n    </ion-content>\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/searchChargingPile.html", "<ion-view>\r\n    <ion-nav-title side=\"center\">\r\n      <span ui-sref=\"app.chargeStationInfo({id:chargeingStationId})\">电站详情</span>/<span>充电终端</span>\r\n    </ion-nav-title>\r\n\r\n    <ion-content>\r\n      <ion-refresher pulling-text=\"下拉刷新...\" on-refresh=\"doRefresh()\"></ion-refresher>\r\n      <ion-list>\r\n        <ion-item>\r\n            空闲优先|快充优先|慢充优先|筛选\r\n        </ion-item>\r\n        <ion-item ng-repeat-start=\"i in chargePileList\" ui-sref=\"app.chargePileInfo({id:i.rid})\" class=\"item-icon-left item-icon-right\">\r\n          <h2><span>编号</span>{{i.terminalid}}</h2>\r\n          <h2><span>终端类型</span>{{i.terminalType}}</h2>\r\n          <h2><span>充电接口</span>{{i.interface}}</h2>\r\n          <h2><span>车位号</span>{{i.parkingSpace}}</h2>\r\n        </ion-item>\r\n        <ion-item ng-repeat-end class=\"item-divider\"></ion-item>\r\n      </ion-list>\r\n    </ion-content>\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/settings.html", "<ion-view>\r\n    <ion-header-bar align-title=\"center\" class=\"bar-positive\">\r\n    <button class=\"button button-icon icon ion-navicon\" menu-toggle=\"left\"></button>\r\n        <h1 class=\"title\">Settings</h1>\r\n    </ion-header-bar>\r\n\r\n    <ion-content>\r\n        <div class=\"list\">\r\n\r\n            <!-- connect toggles to controller using ng-model -->\r\n\r\n            <ion-toggle>\r\n                <span class=\"settings-item__text\">\r\n                    Allow Push Notifications\r\n                </span>\r\n            </ion-toggle>\r\n\r\n            <ion-toggle>\r\n                <span class=\"settings-item__text\">\r\n                    Allow cookies\r\n                </span>\r\n            </ion-toggle>\r\n\r\n        </div>\r\n    </ion-content>\r\n\r\n</ion-view>\r\n");
  $templateCache.put("templates/views/signin.html", "    <!-- <ion-header-bar align-title=\"center\" class=\"bar-positive\">\r\n    <button class=\"button button-icon icon ion-navicon\" menu-toggle=\"left\"></button>\r\n        <h1 class=\"title\">登录</h1>\r\n    </ion-header-bar> -->\r\n<ion-view view-title=\"登录\">\r\n    <ion-content>\r\n      <div class=\"list list-inset\">\r\n        <label class=\"item item-input\">\r\n          <input type=\"text\" placeholder=\"账号\">\r\n        </label>\r\n        <label class=\"item item-input\">\r\n          <input type=\"password\" placeholder=\"密码\">\r\n        </label>\r\n        <div class=\"item item-input-inset\">\r\n          <label class=\"item-input-wrapper\">\r\n            <input type=\"number\" placeholder=\"验证码\" ng-model=\"param.captcha\">\r\n          </label>\r\n          <button class=\"button button-small button-positive\" ng-click=\"loginRequesCaptcha();\">\r\n            发送验证码\r\n          </button>\r\n        </div>\r\n        <button class=\"button button-full button-positive\" ng-click=\"signin();\">\r\n          登录\r\n        </button>\r\n        <button class=\"button button-full button-positive\" ng-click=\"signout();\">\r\n          退出\r\n        </button>\r\n        <button class=\"button button-full button-positive\" ng-click=\"gotoResetKey();\">\r\n          修改密码\r\n        </button>\r\n        <button class=\"button button-full button-positive\" ng-click=\"gotoRegister();\">\r\n          注册\r\n        </button>\r\n      </div>\r\n\r\n    </ion-content>\r\n  </ion-view>");
}]);