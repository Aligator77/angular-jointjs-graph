'use strict';
angular.module('angular-jointjs-graph')
  .factory('FactoryMap', ['$injector',
    function($injector) {
      var factoriesMap = {};

      return {
        register: function (factoryName, alias) {
          factoriesMap[alias || factoryName] = factoryName;
        },
        get: function(nameOrAlias) {
          try {
            if (factoriesMap[nameOrAlias]) {
              return $injector.get(factoriesMap[nameOrAlias], null);
            } else {
              return null;
            }
          } catch(e) {
            return null;
          }
        }
      };
    }
  ]);
