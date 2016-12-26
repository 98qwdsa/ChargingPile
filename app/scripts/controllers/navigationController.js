'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('NavigationController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN, $cordovaGeolocation) {
    //初始化定位
    var map = new BMap.Map("allmap");
    map.centerAndZoom("深圳", 14);

    var posOptions = {
      timeout: 10000,
      enableHighAccuracy: false
    };
    //坐标定位
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
      map.panTo(new BMap.Point(position.coords.longitude, position.coords.latitude));

      driveTo([position.coords.longitude, position.coords.latitude], [$state.params.lgt, $state.params.lat]);
    }, function(err) {
      console.log(err);
    });

    function driveTo(po1, po2) {
      var p1 = new BMap.Point(po1[0], po1[1]);
      var p2 = new BMap.Point(po2[0], po2[1]);

      var driving = new BMap.DrivingRoute(map, {
        renderOptions: {
          map: map,
          autoViewport: true
        },
        policy: BMAP_DRIVING_POLICY_LEAST_TIME
      });
      driving.search(p1, p2);
    }

  });