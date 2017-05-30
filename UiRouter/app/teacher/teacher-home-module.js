/**
 * Created by sony on 17.04.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.teacherHome', ['ngRoute', 'ui.grid'])
        .controller('teacherHomeCtrl', ['$scope', '$http', '$state', '$timeout', '$stateParams', '$q', '$window', '$cookies', function ($scope, $http, $state, $timeout, $stateParams, $q, $window, $cookies) {
            $scope.isCreatedSuccessfully = false;
            $scope.myOpenProjectList = [];
            $scope.projectForm = {};
            $scope.createdProjectsByStudents = [];
            $scope.searchParameters = {};
            $scope.studentProjectList = [];

            //!!!! userId geçici olarak 1 seçildi daha sonra cookie'den alınması gerekiyor.
            var LessonService = 'http://ali.techlife.com.tr/api/Term/GetUserLessons?UserId=' + JSON.parse($cookies.UserInformations).Id;

            $http({ method: 'GET', url: LessonService }).then(function successCallback(response) {
                $scope.lessons = response.data;
                console.log($scope.lessons);
            }, function errorCallback(response) {

            });

            // projeleri getir
            $scope.GetProjectList = function() {

                var ProjectListService = 'http://ali.techlife.com.tr/api/Term/GetUserProjectDescs?UserId=' + JSON.parse($cookies.UserInformations).Id;

                $http({ method: 'GET', url: ProjectListService }).then(function successCallback(response) {
                    $scope.projects = response.data;
                    $scope.gridOptions.columnDefs = [];
                    $scope.gridOptions.data = response.data;
                    $scope.generateProjectGridColumns();
                }, function errorCallback(response) {

                });
            }

            $scope.GetProjectList();

            $scope.createAProject = function() {
                $scope.test = true;
                //$scope.projectForm = {};
                $('#myModal').modal('show');

            }

            $scope.showDetails = function() {
                console.log(selectedProjectId);
                if (selectedProjectId != null) {
                    $state.go('details', { projectId: selectedProjectId });

                }
                else {
                    alert("please select a project");
                }

            }

            $scope.createProjectTemplate = function(projectForm) {
                var SaveProjectService = 'http://ali.techlife.com.tr/api/Term/SaveProjectDesc';

                $http({
                    method: 'POST',
                    url: SaveProjectService,
                    data: {
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
                    if (response.data == true) {
                        $scope.GetProjectList();
                        $('#myModal').modal('hide');
                        $scope.projectForm = {};
                        location.reload();
                        alert("Project successfully created.");
                        

                    }
                    else {

                        alert("project could not be saved.");
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
                //enableSelectAll: true,
                //selectionRowHeaderWidth: 5,
                enableRowHashing: false,
                rowHeight: 35,
                showGridFooter: false
            };


            $scope.clickedCheckbox = function (row) {
                var test = row;
            }


            $scope.generateProjectGridColumns = function() {
                $scope.gridOptions.columnDefs = [{
                        name: "",
                        field: "check",
                        headerTemplate: '<input type=\"checkbox\"',
                        cellTemplate: '<input type="checkbox" ng-model="{{COL_FIELD}}\" ng-click="grid.appScope.clickedCheckbox(row)" ng-true-value=\'Y\' ng-false-value=\'N\' />',
                        width: '1%',
                    },

                    { name: 'Project Name', field: 'Name', width: '20%' },
                    { name: 'Description', field: 'Description' },
                    { name: 'Lesson', field: 'LessonName' },
                    { name: 'Start Date', field: 'StartDate' },
                    { name: 'Deadline', field: 'EndDate' },
                    { name: 'Score Effect', field: 'ScoreEffect' },
                ];
            }


            //$scope.gridOptions.multiSelect = true;


            $scope.gridOptions.onRegisterApi = function(gridApi) {
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


            $scope.gridOptions2.columnDefs = [{
                    name: "",
                    field: "check",
                    headerCellClass: '<input type="checkbox"',
                    cellTemplate: '<input type="checkbox" ng-model="grid.appScope.selectedRow[row.uid]" ng-click="grid.appScope.selectStudentProject(row.entity)">',
                    width: '1%',
                },
                { name: 'Project Name', field: 'Name', width: '20%' },
                { name: 'Lesson', field: 'LessonName' },
                { name: 'Description', field: 'Description' },
                { name: 'Score', field: 'Score' },
                { name: 'Status', field: 'Status' },
            ];

            $scope.gridOptions2.multiSelect = true;


            $scope.gridOptions2.onRegisterApi = function(gridApi) {
                $scope.gridApi2 = gridApi;
            }

            $scope.getStudentProjects = function() {
                var studentProjectsService = 'http://ali.techlife.com.tr/api/Term/GetTeacherProjects?UserId=' + JSON.parse($cookies.UserInformations).Id;

                $http({ method: 'GET', url: studentProjectsService }).then(function successCallback(response) {
                    $scope.studentProjectList = response.data
                    $scope.gridOptions2.data = response.data;
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                });
            }

            var selectedProjectId;

            $scope.selectStudentProject = function(entity) {
                selectedProjectId = entity.Id;
            }

            $scope.getStudentProjects();
            $scope.generateProjectGridColumns();

            //$scope.filteredProjectList = [];
            //$scope.searchProjects = function(){
            //    $scope.filteredProjectList = _.filter($scope.studentProjectList, function(project){
            //        return project.Name == $scope.searchParameters.projectName;
            //    })
            //    var test = $scope.filteredProjectList;
            //}

            $scope.searchProjects = function () {
                var studentProjectsService = 'http://ali.techlife.com.tr/api/Term/SearchProjects?UserId=4'
                var ProjectName = $scope.searchParameters.projectName;
                var ProjectId = $scope.searchParameters.projectId;
                var StudentNo = $scope.searchParameters.studentName;
                if (!StudentNo) StudentNo = 0;
                alert(ProjectId + " - " + ProjectName + " - " + StudentNo);
                var studentProjectsService = 'http://ali.techlife.com.tr/api/Term/SearchProjects?ProjectId=' + ProjectId + '&StudentNo=' + StudentNo + '&ProjectName=' + ProjectName
            }


            $scope.filteredProjectList = [];
            $scope.searchProjects = function() {
                $scope.filteredProjectList = _.filter($scope.studentProjectList, function(project) {
                    return project.Name == $scope.searchParameters.projectName;
                })
                var test = $scope.filteredProjectList;
            }

            $scope.redirectToProjectDetails = function(project) {
                $state.go('details', { projectId: project.Id });
            }

            $(function() { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});