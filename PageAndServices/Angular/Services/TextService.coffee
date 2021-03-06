﻿window.app.service('TextService', 

[ '$http', 
(  $http) ->
    
    this.baseUrl = "/api/text"

    this.delete = (id) ->
        $http
            url: this.baseUrl + "/" + id
            method: "DELETE"

    this.get = (id) ->
        $http
            url: this.baseUrl + "/" + id
            method: "GET"

    this.getAll = ->
        $http
            url: this.baseUrl
            method: "GET"

    this.getAllByControllerAndLanguage = (controllerName, language) ->
        $http
            url: this.baseUrl + "/getpagetexts?controllerName=" + controllerName + "&language=" + language
            method: "GET"

    this.getAllByLanguage = (language) ->
        $http
            url: this.baseUrl + "/getlangtexts?language=" + language
            method: "GET"

    this.post = (model) ->
        $http
            url: this.baseUrl
            method: "POST"
            data: model

    this.postAll = (models) ->
        $http
            url: this.baseUrl + "/savetexts"
            method: "POST"
            data: models

    this.put = (model) ->
        $http
            url:this.baseUrl
            method: "PUT"
            data: model

])