'use strict';
angular.module('angular-jointjs-graph')
  .factory('GraphLinks', ['GraphHelpers',
    function(GraphHelpers) {
      var links = [];

      function findLink(graphModel) {
        var backendModelParams = graphModel.get('backendModelParams'),
            modelIdKey = GraphHelpers.getModelIdKey();

        return links.filter(function(link) {
          return link[modelIdKey] === backendModelParams[modelIdKey];
        })[0];
      }

      return {
        set: function(linksArray) {
          links = linksArray;
        },
        addSingle: function(entity) {
          links.push(entity);
        },
        getSingle: function(graphElement) {
          return findLink(graphElement);
        },
        remove: function(graphElement) {
          links.splice(links.indexOf(findLink(graphElement)), 1);
        }
      };
    }
  ]);
