'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('ChargeStationController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
    const getChargingStationsInfoParam = {
      userid: 13420989008
    }

    $scope.chargeStationId = $state.params.id

    API_ENDPOINT.postData.datas = getChargingStationsInfoParam;
    
    $http.post(API_ENDPOINT.host + API_ENDPOINT.getChargingStationsInfo.url, API_ENDPOINT.postData).then(data => {
      let code = Math.abs(data.data.errorCode);

      if (0 === code) {
        $scope.ChargingStationsInfo = data.data.return[0];
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.getChargingStationsInfo.hint[code],
        });
      }
    }, error => {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error),
      });
    })
  });