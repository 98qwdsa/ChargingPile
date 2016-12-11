'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('ResetKeyController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

    let resetKeyParams = {
      userid: '',
      userKey: '',
      captcha: ''
    }

    $scope.param = resetKeyParams;


    $scope.resetKeyRequestCaptcha = () => {

      let captchaParam = {
        userid: ''
      }

      FN.getQueryParam(captchaParam, $scope.param);
      API_ENDPOINT.postData.datas = captchaParam;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.resetKeyRequestCaptcha.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.resetKeyRequestCaptcha.hint[code],
        });

      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })
    }

    $scope.resetKey = () => {
      FN.getQueryParam(resetKeyParams, $scope.param);

      API_ENDPOINT.postData.datas = resetKeyParams;

      $http.post(API_ENDPOINT.host + API_ENDPOINT.resetKey.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.resetKey.hint[code],
        });
        alertPopup.then(res => {
          if (code === 0) {
            $state.go('app.login');
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