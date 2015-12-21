'use strict';
angular.module('angular-jointjs-graph')
  .provider('FactoryMap', [
    function() {
      var factoriesMap = {};

      this.register = function(factoryName, alias) {
        factoriesMap[alias || factoryName] = factoryName;
      };

      this.$get = ['$injector',
        function($injector) {
          return {
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
        }];
    }
  ]);
