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
    angular.module('myApp.studentHome', ['ngRoute', 'ui.grid'])
        .controller('studentHomeCtrl', ['$scope', '$http', '$state','$timeout', '$stateParams', function ($scope, $http, $state, $timeout, $stateParams) {

           var test = true;
           $scope.createAProject = function(){
               $state.go('initProject', { sso : $stateParams.sso, password: $stateParams.password});
           }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

