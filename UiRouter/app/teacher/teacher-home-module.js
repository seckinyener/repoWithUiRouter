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
    angular.module('myApp.teacherHome', ['ngRoute'])
        .controller('teacherHomeCtrl', ['$scope', '$http', '$state','$timeout', function ($scope, $http, $state, $timeout) {
            //$state.go("home2");
            $scope.test = true;
            $scope.isCreatedSuccessfully = false;

            $scope.resultList = [{
                "studentName" : "Mike Charlton",
                "projectName" : "Test",
                "courseName" : "Se",
                "softwareTools" : "Java,Angular,SpringBoot",
                "expireDate" : "23.04.2017"
            },
                {
                    "studentName" : "Ryan Gosling",
                    "projectName" : "Deneme",
                    "courseName" : "Se",
                    "softwareTools" : ".Net,Javascript",
                    "expireDate" : "23.04.2017"
                },
                {
                    "studentName" : "James Gosling",
                    "projectName" : "Deneme",
                    "courseName" : "Se",
                    "softwareTools" : "Java",
                    "expireDate" : "23.04.2017"
                }];

            $scope.createAProject = function(){
                $scope.test = true;
                $('#myModal').modal('show');
            }

            $scope.showDetails = function(){
                $state.go("details");
            }

            $scope.createProjectTemplate = function(){
                $scope.isCreatedSuccessfully = true;
                $scope.alertMessage = "Project created successfully";
                $timeout( function(){
                    $scope.isCreatedSuccessfully = false;
                    $('#myModal').modal('hide');
                    }, 3000);
            }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

