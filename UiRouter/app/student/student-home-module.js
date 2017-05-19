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
           var userProjectService = 'http://ali.techlife.com.tr/api/Term/GetStudentProjectDescs?UserId=1'
            $http({ method: 'GET', url: userProjectService }).then(function successCallback(response) {
                $scope.lessons = response.data;
                $scope.gridOptions.data = response.data;
                console.log($scope.lessons);
            }, function errorCallback(response) {
                var test = response;
                console.log(response);
            });

            var userProjectService = 'http://ali.techlife.com.tr/api/Term/GetUserProjects?UserId=1'
            $http({ method: 'GET', url: userProjectService }).then(function successCallback(response) {
                $scope.studentProjects = response.data;
                $scope.gridOptions2.data = $scope.studentProjects;
            }, function errorCallback(response) {
                var test = response;
                console.log(response);
            });

           $scope.createAProject = function(){
               $state.go('first.initProject');
           }

            $scope.clickedCheckbox = function(data){
               $scope.selectedProject.name = data.Name;
               $scope.selectedProject.description= data.Description;
               $scope.selectedProject.endDate = data.EndDate;
               $scope.selectedProject.projectId= data.Id;
               $scope.selectedProject.lessonId= data.LessonId;
               $scope.selectedProject.name= data.Name;
               $scope.selectedProject.startDate= data.StartDate;
            }

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
                    headerCellClass: '<input type="checkbox">',
                    cellTemplate: '<input type="checkbox" ng-model="grid.appScope.selectedRow[row.uid]" ng-click="grid.appScope.clickedCheckbox(row.entity)">',
                    width: '1%',
                },
                { name: 'Course Name', field: 'LessonName' },
                { name: 'Description', field: 'Description' },
                { name: 'Project Name', field: 'Name', width: '20%' },
                { name: 'Start Date', field: 'StartDate' },
                { name: 'Deadline', field:'EndDate' },
                { name: 'Score Effect', field:'ScoreEffect' },
            ];

            $scope.gridOptions.multiSelect = true;

            $scope.gridOptions.onRegisterApi = function( gridApi ) {
                $scope.gridApi = gridApi;
            }

            $scope.someProp = 'abc',
                $scope.showMe = function(sec){
                    var aaa = sec;
                    alert($scope.someProp);
                };

            $scope.selectStudentProject = function(entity){
                $scope.selectedProject.myProjectId = entity.Id;
            }

            $scope.gridOptions2 = {};

            //you can override the default assignment if you wish
            //$scope.gridOptions.appScopeProvider = someOtherReference;

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

            $scope.seeMyProjectDetails = function(){
                $state.go("first.student-project-details");
            }
            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

