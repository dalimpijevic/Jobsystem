﻿angular.module('services', ['ngResource'])

    .factory('Administrator', ['$resource', ($resource) ->
        $resource '/api/administrators/:id', { id: '@id' }, { update: { method: 'PUT' } }])

    .factory('Employee', ['$resource', ($resource) ->
        $resource 'api/employees/:id', { id: '@id' }, { update: { method: 'PUT' } }])

    .factory('Customer', ['$resource', ($resource) ->
        $resource 'api/customers/:id', { id: '@id' }, { update: { method: 'PUT' } }])

    .factory('CustomerPrivate', ['$resource', ($resource) ->
        $resource 'api/customersprivate/:id', { id: '@id' }, { update: { method: 'PUT' } }])

    .factory('Mission', ['$resource', ($resource) ->
        $resource 'api/missions/:id', { id: '@id' }, { update: { method: 'PUT' } }])

    .factory('MissionPet', ['$resource', ($resource) ->
        $resource 'api/missionspet/:id', { id: '@id' }, { update: { method: 'PUT' } }])
    
    .factory('Pet', ['$resource', ($resource) ->
        $resource 'api/pets/:id', { id: '@id' }, { update: { method: 'PUT' } }])