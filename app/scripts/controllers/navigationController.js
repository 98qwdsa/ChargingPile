'use strict';

/**
 * @ngdoc function
 * @name ChargingPile.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('ChargingPile')
  .controller('NavigationController', function($scope, $state, $http, $ionicPopup, API_ENDPOINT, FN, $cordovaGeolocation) {
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
       console.log(position.coords.longitude,position.coords.latitude)
       var map = new BMap.Map("allmap");    // 创建Map实例
          map.centerAndZoom(new BMap.Point( position.coords.longitude,position.coords.latitude), 14);
            // 初始化地图,设置中心点坐标和地图级别
          map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
          map.setCurrentCity("深圳");          // 设置地图显示的城市 此项是必须设置的
          map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }, function(err) {
      console.log(err);
    });
 
  });