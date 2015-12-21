'use strict';
angular.module('angular-jointjs-graph')
  .provider('JointGraphConfig', ['FactoryMapProvider',
    function(FactoryMapProvider) {
      var config;

      this.init = function(configObj) {
        config = configObj;

        FactoryMapProvider.register(config.linkCreationCallbacks, 'LinkFactory');
        FactoryMapProvider.register(config.entityMarkupParams, 'JointNodeParams');
        FactoryMapProvider.register(config.linkMarkupParams, 'JointLinkParams');

        Object.keys(config.entityCreationCallbacks).forEach(function(key) {
          FactoryMapProvider.register(config.entityCreationCallbacks[key], key);
        });
      };

      this.$get = [
        function() {
          if (config) {
            return config;
          } else {
            throw new Error('JointGraphConfig provider must be initialized in a config block');
          }
        }];
    }
  ]);
