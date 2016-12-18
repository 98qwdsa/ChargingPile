'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('SearchChargeStationController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {
    const getChargingStationsListParam = {
      "city": "深圳",
      "mode": "dim/place",
      "keyword": "直流",
      "longitude": 34.343434324,
      "latitude": 45.434534534,
      "distance": 10
    }

    API_ENDPOINT.postData.datas = getChargingStationsListParam;
    $scope.doRefresh = () => {
      $http.post(API_ENDPOINT.host + API_ENDPOINT.getChargingStationsInfo.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);

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
            template: API_ENDPOINT.getChargingStationsInfo.hint[code],
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