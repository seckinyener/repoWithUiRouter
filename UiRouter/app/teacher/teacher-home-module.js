/**
 * Created by sony on 17.04.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function (angular) {
    angular.module('myApp.teacherHome', ['ngRoute', 'ui.grid'])
        .controller('teacherHomeCtrl', ['$scope', '$http', '$state', '$timeout', '$stateParams', '$q', function ($scope, $http, $state, $timeout, $stateParams, $q) {

            $scope.test = true;
            $scope.isCreatedSuccessfully = false;
            $scope.myOpenProjectList = [];
            $scope.projectForm = {};

            //!!!! userId geçici olarak 1 seçildi daha sonra cookie'den alınması gerekiyor.
            var LessonService = 'http://ali.techlife.com.tr/api/Term/GetUserLessons?UserId=1'

            $http({ method: 'GET', url: LessonService }).then(function successCallback(response) {
                $scope.lessons = response.data;
                console.log($scope.lessons);
                $scope.projectForm.projectLesson = $scope.lessons[0];
            }, function errorCallback(response) {

            });



            $scope.resultList = [{
                "studentName": "Mike Charlton",
                "projectName": "Test",
                "courseName": "Se",
                "softwareTools": "Java,Angular,SpringBoot",
                "expireDate": "23.04.2017"
            },
            {
                "studentName": "Ryan Gosling",
                "projectName": "Deneme",
                "courseName": "Seccccc",
                "softwareTools": ".Net,Javascript",
                "expireDate": "23.04.2017"
            },
            {
                "studentName": "James Gosling",
                "projectName": "Deneme",
                "courseName": "Se",
                "softwareTools": "Java",
                "expireDate": "23.04.2017"
            }];

            $scope.createAProject = function () {
                $scope.test = true;
                //$scope.projectForm = {};
                $('#myModal').modal('show');




            }

            $scope.showDetails = function () {
                $state.go("details");
            }

            $scope.createProjectTemplate = function (projectForm) {
                $scope.isCreatedSuccessfully = true;
                $scope.alertMessage = "Project created successfully";
                var project = {};

                project.projectName = $scope.projectForm.projectName;
                project.courseName = "SoftwareEngineering";
                project.softwareTools = $scope.projectForm.usedTools;
                project.expireDate = $scope.projectForm.projectExpireDate;

                // $scope.resultList.push(project);
                // $scope.gridOptions.data = $scope.resultList;

                console.log();

                var SaveProjectService = 'http://ali.techlife.com.tr/api/Term/SaveProjectDesc';

                $http({
                    method: 'POST', url: SaveProjectService, data: {
                            "Id": 0,
                            "Name": $scope.projectForm.projectName,
                            "LessonId": JSON.parse($scope.projectForm.projectLesson).Id,
                            "LessonName": JSON.parse($scope.projectForm.projectLesson).Name,
                            "ScoreEffect": 100,
                            "StartDate": $scope.projectForm.StartDate,
                            "EndDate": $scope.projectForm.EndDate,
                            "Description": $scope.projectForm.projectDescription,
                            "ParentId": 0,
                            "UserId": 4,
                            "isDeleted": false

                        }
                    
                }).then(function successCallback(response) {

                }, function errorCallback(response) {

                });

                // $timeout( function(){
                //     $scope.isCreatedSuccessfully = false;
                //     $('#myModal').modal('hide');
                //     }, 3000);



            };
            $scope.gridOptions = {
                enableRowSelection: true,
                enableSelectAll: true,
                selectionRowHeaderWidth: 5,
                enableRowHashing: false,
                rowHeight: 35,
                showGridFooter: false
            };

            $scope.gridOptions.columnDefs = [
                {
                    name: "",
                    field: "check",
                    headerTemplate: '<input type=\"checkbox\"',
                    cellTemplate: '<input type=\"checkbox\" ng-model=\"{{COL_FIELD}}\" ng-true-value=\'Y\' ng-false-value=\'N\' />',
                    width: '1%',
                },

                { field: 'projectName', width: '20%' },
                { field: 'courseName' },
                { field: 'softwareTools' },
                { field: 'expireDate' }
            ];

            $scope.gridOptions.multiSelect = true;

            var getOpenProjects = function () {
                var deferred = $q.defer();
                deferred.resolve($scope.resultList);
                return deferred.promise;
            }

            getOpenProjects().then(function (response) {
                $scope.gridOptions.data = response;
            });

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

