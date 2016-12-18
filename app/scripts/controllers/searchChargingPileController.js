'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('SearchChargingPileController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
    $scope.chargeingStationId = $state.params.id;
    
    const getChargingPileListParam = {
      rid: 13420989008
    }

    API_ENDPOINT.postData.datas = getChargingPileListParam;
    $scope.doRefresh = () => {
      $http.post(API_ENDPOINT.host + API_ENDPOINT.getChargingPileInfo.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

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
            template: API_ENDPOINT.getChargingPileInfo.hint[code],
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