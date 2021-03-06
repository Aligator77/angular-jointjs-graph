'use strict';
angular.module('angular-jointjs-graph')
  .factory('GraphEntities', ['GraphHelpers',
    function(GraphHelpers) {
      var entities = {},
          entityToJointModelMap = {};

      function getIdentifiers(graphModel) {
        var backendModelParams = graphModel.backendModelParams || graphModel.get('backendModelParams'),
            typeIdentifier = backendModelParams.entityIdentifier,
            modelIdKey = GraphHelpers.getModelIdKey(),
            uniqueId = backendModelParams[modelIdKey];

        return { typeIdentifier: typeIdentifier, uniqueId: uniqueId, modelIdKey: modelIdKey };
      }

      function findEntity(identifiers) {
        return entities[identifiers.typeIdentifier].filter(function(entity) {
          return entity[identifiers.modelIdKey] === identifiers.uniqueId;
        })[0];
      }

      return {
        set: function(entitiesMap) {
          Object.keys(entitiesMap).forEach(function(identifier) {
            entities[identifier] = entitiesMap[identifier];
            entityToJointModelMap[identifier] = {};
          });
        },
        addSingle: function(graphElement, entity) {
          var ids = getIdentifiers(graphElement);

          entity.show = false;
          entityToJointModelMap[ids.typeIdentifier][ids.uniqueId] = graphElement.id;
          entities[ids.typeIdentifier].unshift(entity);
        },
        getSingle: function(graphElement) {
          return findEntity(getIdentifiers(graphElement));
        },
        getForType: function(identifier) {
          return entities[identifier];
        },
        markPresentOnGraph: function(graphElement) {
          var ids = getIdentifiers(graphElement);

          entityToJointModelMap[ids.typeIdentifier][ids.uniqueId] = graphElement.id;
          var entity = findEntity(ids);

          if (entity) {
            entity.show = false;
          }
        },
        markRemovedFromGraph: function(graphElement) {
          var ids = getIdentifiers(graphElement);

          delete entityToJointModelMap[ids.typeIdentifier][ids.uniqueId];
          var entity = findEntity(ids);

          if (entity) {
            entity.show = true;
          }
        },
        jointModelId: function(typeIdentifier, entity) {
          return entityToJointModelMap[typeIdentifier][entity[GraphHelpers.getModelIdKey()]];
        },
        remove: function(entity, identifier) {
          var entityId = entity[GraphHelpers.getModelIdKey()],
              entityIndex = entities[identifier].indexOf(entity);

          delete entityToJointModelMap[identifier][entityId];
          entities[identifier].splice(entityIndex, 1);
        }
      };
    }
  ]);
