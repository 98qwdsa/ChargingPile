'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('ChargeHistoryController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

    const getUserChargeHistoryParam = {
      userid: ''
    }

    $scope.orderState = ['用户已经预约电桩等待用户充电','充电进行中','充电中断等待恢复','正常完成充电，交易结算']

    API_ENDPOINT.postData.datas = getUserChargeHistoryParam;
    $scope.doRefresh = () => {
      $http.post(API_ENDPOINT.host + API_ENDPOINT.getUserChargeHistory.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

        if (0 === code) {
          if($scope.chargeHistory){
            $scope.chargeHistory = data.data.return.concat($scope.chargeHistory);
          }else{
            $scope.chargeHistory = data.data.return;
          }
          $scope.$broadcast('scroll.refreshComplete');
          console.log($scope.chargeHistory);
        } else {
          var alertPopup = $ionicPopup.alert({
            //title: CALLBACKTANS.registerRequestCaptcha[code],
            template: API_ENDPOINT.getUserChargeHistory.hint[code],
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