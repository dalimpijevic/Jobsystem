﻿window.GardenInputFormCtrl = ($scope, $http, Performer) ->

    ## -- INITIALIZING

    $scope.dateOptions = 
        monthNames: ['Januari','Februari','Mars','April','Maj','Juni','Juli','Augusti','September','Oktober','November','December']
        monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
        dayNamesShort: ['Sön','Mån','Tis','Ons','Tor','Fre','Lör']
        dayNames: ['Söndag','Måndag','Tisdag','Onsdag','Torsdag','Fredag','Lördag']
        dayNamesMin: ['Sö','Må','Ti','On','To','Fr','Lö']
        weekHeader: 'Ve'
        dateFormat: 'yy-mm-dd'
        firstDay: 1
        isRTL: false

    $scope.inputForm = {}
    $scope.inputForm.selectedTasks = []
    $scope.inputForm.selectedPerformers = []
    $scope.inputForm.assignment = {} 

    $scope.inputForm.assignment.date = new Date()
    $scope.inputForm.login = false
    $scope.inputForm.assignment.times = 1

    $http
        url: "/api/knowledge/Category?categoryId=1"
        method: "GET"
    .success (status, data, headers, config) ->
        $scope.tasks = status

    ## -- TASKS

    $scope.removeTask = (taskId) ->
        $scope.inputForm.selectedTasks = _.filter $scope.inputForm.selectedTasks, (listTaskId) ->
            listTaskId != taskId

    $scope.addTask = (taskId) ->
        if !$scope.containsTask taskId
            $scope.inputForm.selectedTasks.push taskId
        else
            $scope.removeTask taskId

    $scope.containsTask = (taskId) ->
        _.contains $scope.inputForm.selectedTasks, taskId

    ## -- PERFORMERS

    $scope.performers = Performer.query()

    $scope.removePerformer = (performerId) ->
        $scope.inputForm.selectedPerformers = _.filter $scope.inputForm.selectedPerformers, (listedPerformerId) ->
            listedPerformerId != performerId

    $scope.addPerformer = (performerId) ->
        if !$scope.containsPerformer performerId
            $scope.inputForm.selectedPerformers.push performerId
        else
            $scope.removePerformer performerId

    $scope.containsPerformer = (performerId) ->
        _.contains $scope.inputForm.selectedPerformers, performerId

    ## -- PREVIEW PERFORMER

    $scope.previewPerformer = (performer) ->
        $scope.selectedPerformer = performer

    $scope.closePreview = ->
        $scope.selectedPerformer = null

    $scope.performerIsSelected = (performerId) ->
        _.contains $scope.selectedPerformers, performerId

    $scope.getAge = (dateString) ->

        if !dateString
            return 0

        today = new Date()
        birthDate = new Date(dateString)
        age = today.getFullYear() - birthDate.getFullYear()
        m = today.getMonth() - birthDate.getMonth()
        if m < 0 || (m == 0 && today.getDate() < birthDate.getDate())
            age--;

        return age

    $scope.getDate = (dateTimeString) ->
        
        if !dateTimeString
            return ""

        return dateTimeString.split('T')[0]

    ## -- FINISH

    $scope.order = ->
        console.log $scope.inputForm