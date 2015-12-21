'use strict';
angular.module('angular-jointjs-graph')
  .factory('GraphHelpers', ['$q', 'JointGraphConfig',
    function($q, JointGraphConfig) {
      function getProperties(identifier) {
        var modelIdKey = JointGraphConfig.modelIdKey || 'id',
            properties;

        if (identifier) {
          properties = JointGraphConfig.entityModelProperties ?
            JointGraphConfig.entityModelProperties[identifier] : null;
        } else {
          properties = JointGraphConfig.linkModelProperties;
        }

        if (angular.isArray(properties)) {
          return angular.copy(properties).concat(modelIdKey);
        } else {
          return [modelIdKey];
        }
      }

      function getModelIdKey() {
        return JointGraphConfig.modelIdKey ? JointGraphConfig.modelIdKey : 'id';
      }

      return {
        queryResource: function(resourceClass) {
          var deferred = $q.defer();

          resourceClass.query(function(response) {
            deferred.resolve(response);
          }, function(error) {
            deferred.reject(error);
          });

          return deferred.promise;
        },
        getModelIdKey: getModelIdKey,
        entityProperties: function(identifier) {
          return getProperties(identifier);
        },
        linkProperties: function() {
          return getProperties();
        }
      };
    }
  ]);
