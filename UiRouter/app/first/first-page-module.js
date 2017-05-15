/**
 * Created by sony on 17.04.2017.
 */
/*define(['angular','teacher/teacher-homeController'], function(angular, teacherHomeController){
    'use strict';
    var teacherHomeModule = angular.module("myApp.teacherHome",[]);
    teacherHomeModule.controller = ("teacherHomeCtrl", teacherHomeController);

})*/


'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.firstPage', ['ngRoute', 'ui.grid'])
        .controller('firstPageCtrl', ['$scope', '$http', '$state','$timeout', '$stateParams', function ($scope, $http, $state, $timeout, $stateParams) {

    $scope.test = "1234";
    $scope.selectedProject = {};
    $state.go('.student')


            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

