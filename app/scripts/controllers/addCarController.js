'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('AddCarController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN) {



    $scope.carInfo = {
      "VIN": "",
      "licensePlateNumber": "",
      "carType": 0,
      "carMode": "",
      "chassisNumber": "",
      "engineNumber": ""
    }

    let addCarParams = {
      "userid": "13890098909",
      "userKey": "KDNEJDANDFKAYSDFASDFKSDFASDLFI",
      "object": {
        "motorVehicle": []
      }

    }


    $scope.addCar = () => {
      addCarParams.object.motorVehicle=[$scope.carInfo];

      API_ENDPOINT.postData.datas = addCarParams;

      console.log(API_ENDPOINT.postData)

      $http.post(API_ENDPOINT.host + API_ENDPOINT.setUserInfo.url, API_ENDPOINT.postData).then(data => {
        let code = Math.abs(data.data.errorCode);
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: API_ENDPOINT.setUserInfo.hint[code],
        });

        if (0 === code) {
          $scope.$broadcast('scroll.refreshComplete');
        }


      }, error => {
        var alertPopup = $ionicPopup.alert({
          //title: CALLBACKTANS.registerRequestCaptcha[code],
          template: angular.toJson(error),
        });
      })

    }

  });