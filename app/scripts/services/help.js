'use strict';

angular.module('ChargingPile')
  .factory('FN', function() {

    var getQueryParam = (tag, source, overwrite = false) => {
      let setValue = i => {
        if (overwrite) {
          tag[i] = source[i];
        } else {
          if ('' === tag[i]) {
            tag[i] = source[i];
          }
        }
      };
      
      for (let i in tag) {
        if (angular.isString(source[i]) && '' !== source[i]) {
          setValue(i);
        }
      }
    };

    return {
      getQueryParam
    };

  });