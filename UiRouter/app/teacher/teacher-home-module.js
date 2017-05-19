
/**
 * Created by sony on 17.04.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function (angular) {
    angular.module('myApp.teacherHome', ['ngRoute', 'ui.grid'])
        .controller('teacherHomeCtrl', ['$scope', '$http', '$state', '$timeout', '$stateParams', '$q', '$window', function ($scope, $http, $state, $timeout, $stateParams, $q, $window) {

            $scope.test = true;
            $scope.isCreatedSuccessfully = false;
            $scope.myOpenProjectList = [];
            $scope.projectForm = {};
            $scope.createdProjectsByStudents = [];

            //!!!! userId geçici olarak 1 seçildi daha sonra cookie'den alınması gerekiyor.
            var LessonService = 'http://ali.techlife.com.tr/api/Term/GetUserLessons?UserId=1'

            $http({ method: 'GET', url: LessonService }).then(function successCallback(response) {
                $scope.lessons = response.data;
                console.log($scope.lessons);
                $scope.projectForm.projectLesson = $scope.lessons[0];
            }, function errorCallback(response) {

            });

            // projeleri getir
            $scope.GetProjectList = function () {

                var ProjectListService = 'http://ali.techlife.com.tr/api/Term/GetUserProjectDescs?UserId=4';

                $http({ method: 'GET', url: ProjectListService }).then(function successCallback(response) {
                    $scope.projects = response.data;
                    $scope.gridOptions.data = response.data;
                }, function errorCallback(response) {

                });
            }

            $scope.GetProjectList();

            $scope.createAProject = function () {
                $scope.test = true;
                //$scope.projectForm = {};
                $('#myModal').modal('show');

            }

            $scope.showDetails = function () {
                $state.go('details', {projectId : selectedProjectId});
            }

            $scope.createProjectTemplate = function (projectForm) {
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
                    if(response.data == true)
                    {
                        $scope.GetProjectList();
                        $('#myModal').modal('hide');
                        $scope.projectForm = {};

                    }
                    else
                    {
                        alert("proje kaydedilemedi.");
                    }
                    
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

            $scope.clickedCheckbox = function(row){
                var test = row;
            }

            $scope.gridOptions.columnDefs = [
                {
                    name: "",
                    field: "check",
                    headerTemplate: '<input type=\"checkbox\"',
                    cellTemplate: '<input type="checkbox" ng-model="{{COL_FIELD}}\" ng-click="grid.appScope.clickedCheckbox(row)" ng-true-value=\'Y\' ng-false-value=\'N\' />',
                    width: '1%',
                },

                { name: 'Project Name', field: 'Name', width: '20%' },
                { name: 'Description', field: 'Description' },
                { name: 'Course Name', field: 'LessonName' },
                { name: 'Start Date', field: 'StartDate' },
                { name: 'Deadline', field:'EndDate' },
                { name: 'Score Effect', field:'ScoreEffect' },
            ];

            $scope.gridOptions.multiSelect = true;

            $scope.gridOptions.onRegisterApi = function( gridApi ) {
                $scope.gridApi = gridApi;
            }


            $scope.gridOptions2 = {
                enableRowSelection: true,
                enableSelectAll: true,
                selectionRowHeaderWidth: 5,
                enableRowHashing: false,
                rowHeight: 35,
                showGridFooter: false
            };


            $scope.gridOptions2.columnDefs = [
                {
                    name: "",
                    field: "check",
                    headerCellClass: '<input type="checkbox"',
                    cellTemplate: '<input type="checkbox" ng-model="grid.appScope.selectedRow[row.uid]" ng-click="grid.appScope.selectStudentProject(row.entity)">',
                    width: '1%',
                },
                { name: 'Project Name', field: 'Name', width: '20%' },
                { name: 'Description', field: 'Description' },
                { name: 'Score', field: 'Score' },
                { name: 'Status', field: 'Status' },
            ];

            $scope.gridOptions2.multiSelect = true;

            $scope.gridOptions2.onRegisterApi = function( gridApi ) {
                $scope.gridApi2 = gridApi;
            }

            $scope.getStudentProjects = function(){
                var studentProjectsService = 'http://ali.techlife.com.tr/api/Term/GetTeacherProjects?UserId=4'

                $http({ method: 'GET', url: studentProjectsService }).then(function successCallback(response) {
                    $scope.gridOptions2.data = response.data;
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                });
            }

            var selectedProjectId;
            $scope.selectStudentProject = function(entity){
                selectedProjectId = entity.Id;
            }

            $scope.getStudentProjects();

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

