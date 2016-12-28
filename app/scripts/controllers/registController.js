'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('RegistController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
    let registerParam = {
      userid: '',
      userKey: '',
      mobile: '',
      captcha: ''
    }

    $scope.param = registerParam;

    $scope.registerRequestCaptcha = () => {

      let captchaParam = {
        userid: '',
        userKey: '',
        mobile: ''
      }

      FN.getQueryParam(captchaParam, $scope.param);
      API_ENDPOINT.postData.datas = captchaParam;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.registerRequestCaptcha.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.registerRequestCaptcha.hint[code],
        });
        
      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })
    }

    $scope.register = () => { 

      FN.getQueryParam(registerParam, $scope.param);

      API_ENDPOINT.postData.datas = registerParam;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.register.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.register.hint[code],
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
  });