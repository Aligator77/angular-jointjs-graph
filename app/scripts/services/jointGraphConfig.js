'use strict';
angular.module('angular-jointjs-graph')
  .provider('JointGraphConfig', [
    function() {
      var config;

      this.init = function(configObj) {
        config = configObj;
      };

      this.$get = ['FactoryMap',
        function(FactoryMap) {
          if (!config) {
            throw new Error('JointGraphConfig provider must be initialized in a config block');
          }

          FactoryMap.register(config.linkCreationCallbacks, 'LinkFactory');
          FactoryMap.register(config.entityMarkupParams, 'JointNodeParams');
          FactoryMap.register(config.linkMarkupParams, 'JointLinkParams');

          Object.keys(config.entityCreationCallbacks).forEach(function(key) {
            FactoryMap.register(config.entityCreationCallbacks[key], key);
          });

          return config;
      }];
    }
  ]);
