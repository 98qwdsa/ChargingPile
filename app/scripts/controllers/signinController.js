'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('SigninController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

    let loginParams = {
      userid: '',
      userKey: '',
      captcha: ''
    }

    $scope.param = loginParams;

    $scope.loginRequesCaptcha = () => {
      let captchaParam = {
        userid: ''
      }

      FN.getQueryParam(captchaParam, $scope.param);
      API_ENDPOINT.postData.datas = captchaParam;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.loginRequesCaptcha.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.loginRequesCaptcha.hint[code],
        });

      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })
    }

    $scope.signin = () => {
      FN.getQueryParam(loginParams, $scope.param);

      API_ENDPOINT.postData.datas = loginParams;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.login.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.login.hint[code],
        });
        alertPopup.then(res => {
          if (code === 0) {
            $state.go('app.home');
          }
        });

      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })
    }

    $scope.signout = () => {
      let signoutParam = {
        userid: ''
      }

      FN.getQueryParam(signoutParam, $scope.param);
      API_ENDPOINT.postData.datas = signoutParam;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.signout.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.signout.hint[code],
        });

      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })
    }



    $scope.gotoResetKey = () => {
      $state.go('reset');
    }

    $scope.gotoRegister = () => {
      $state.go('regist');
    }
  });