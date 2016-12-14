Mock.mockjax = function(module) {
  var Item, error;
  Item = (function() {
    function Item() {}

    Item.prototype.add = function(url) {
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

  })();
  try {
    return module.config(['$httpProvider', function($httpProvider) {
      var item;
      item = new Item();
      return $httpProvider.interceptors.push(function() {
        return {
          request: function(config) {
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
          response: function(response) {
            var original;
            original = response.config.original;
            if (original) {
              response.data = original.result;
            }
            return response;
          }
        };
      });
    }]);
  } catch (_error) {
    error = _error;
    return console.error('生成mock.angular失败，例：var app = angular.module("app", []); Mock.mockjax(app);', error);
  }
}

'use strict';

/**
 * @ngdoc overview
 * @name ChargingPile
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


var ChargingPile = angular.module('ChargingPile', ['ionic', 'ngCordova', 'ngResource']);

Mock.mockjax(ChargingPile);

ChargingPile.run(function($ionicPlatform) {

      $ionicPlatform.ready(function() {
        // save to use plugins here
      });

      // add possible global event handlers here
      // 

      Mock.mock('/registerRequestCaptcha', opt => ({
        "errorCode": Mock.mock('@natural(-3, 0)')
      }));
      Mock.mock('/register', opt => ({
        "errorCode": Mock.mock('@natural(-3, 0)')
      }));

      Mock.mock('/resetKeyRequestCaptcha', opt => ({
        "errorCode": Mock.mock({
          "array|1": [
            "0",
            "-1",
            "-3",
          ]
        }).array
      }));
      Mock.mock('/resetKey', opt => ({
        "errorCode": Mock.mock({
          "array|1": [
            "0",
            "-1",
            "-3"
          ]
        }).array
      }));

      Mock.mock('/loginRequesCaptcha', opt => ({
        "errorCode": Mock.mock({
          "array|1": [
            "0",
            "-1",
            "-4",
            "-5"
          ]
        }).array
      }));

      Mock.mock('/login', opt => ({
        "errorCode": Mock.mock('@natural(-3, 0)')
      }));

      Mock.mock('/loginOut', opt => ({
        "errorCode": Mock.mock('@natural(-3, 0)')
      }));

      Mock.mock('/getUserChargeHistor', opt => ({
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
            "chargeEndTime":  Mock.mock('@datetime()'),
            "orderStartTime":  Mock.mock('@datetime()'),
            "startMeterValue": 3333,
            "endMeterValue": 44444,
            "payment": 50.5,
            "paymentRemark": "服务费：4，电费：50，车位费：10"
          }],

          "errorCode": Mock.mock({
            "array|1": [
              "0"/*,
              "-1",
              "-3"*/
            ]
          }).array
        }));



      })

    .config(function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
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
      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/main.html',
          controller: 'MainController'
        })
        .state('app.home', {
          url: '/home',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/home.html',
              controller: 'HomeController'
            }
          }
        })
        .state('app.signin', {
          url: '/signin',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/signin.html',
              controller: 'SigninController'
            }
          }
        }).state('app.regist', {
          url: '/regist',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/regist.html',
              controller: 'RegistController'
            }
          }
        }).state('app.reset', {
          url: '/reset',
          cache: true,
          views: {
            'viewContent': {
              templateUrl: 'templates/views/reset.html',
              controller: 'ResetKeyController'
            }
          }
        }).state('app.chargeHistory', {
          url: '/chargeHistory',
          cache: true,
          views: {
            'viewContent': {
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
    });