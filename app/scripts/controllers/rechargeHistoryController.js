'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('RechargeHistoryController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
    
    const getUserRechargeHistoryParam = {
      userid: 13420989008
    }

    $scope.orderidState = ['用户申请充值', '第三方充值平台处理中(微信,支付宝)', '第三方充值平台处理完成,正在充值中', '充值完成']

    API_ENDPOINT.postData.datas = getUserRechargeHistoryParam;
    $scope.doRefresh = () => {
      $http.post(API_ENDPOINT.host + API_ENDPOINT.getUserRechargeHistory.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

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
            template: API_ENDPOINT.getUserRechargeHistory.hint[code],
          });
        }



      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })
    }


    $scope.doRefresh();
  });