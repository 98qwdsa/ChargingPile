'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:MainController
 * @description
 * # MainController
 */
angular.module('ChargingPile')
  .controller('MyCarPileController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {

    // do something with $scope
    const getUserDetailInfoParam = {
      "userid": "13890098909",
      "userKey": "KDNEJDANDFKAYSDFASDFKSDFASDLFI"
    }

    API_ENDPOINT.postData.datas = getUserDetailInfoParam;

    $http.post(API_ENDPOINT.host + API_ENDPOINT.getUserDetailInfo.url, API_ENDPOINT.postData).then(data => {
      let code = Math.abs(data.data.errorCode);

      if (0 === code) {
        $scope.myCarList = data.data.return.motorVehicle ;
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.getUserDetailInfo.hint[code],
        });
      }
    }, error => {
      var alertPopup = $ionicPopup.alert({
        //title: CALLBACKTANS.registerRequestCaptcha[code],
        template: angular.toJson(error),
      });
    })
  });