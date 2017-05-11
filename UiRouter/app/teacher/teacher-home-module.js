/**
 * Created by sony on 17.04.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.teacherHome', ['ngRoute', 'ui.grid'])
        .controller('teacherHomeCtrl', ['$scope', '$http', '$state','$timeout', '$stateParams', function ($scope, $http, $state, $timeout, $stateParams) {

           $scope.test = true;
            $scope.isCreatedSuccessfully = false;
            $scope.myOpenProjectList = [];
            $scope.projectForm = {};

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
                    "courseName" : "Seccccc",
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
                $scope.projectForm = {};
                $('#myModal').modal('show');
            }

            $scope.showDetails = function(){
                $state.go("details");
            }

            $scope.createProjectTemplate = function(){
                $scope.isCreatedSuccessfully = true;
                $scope.alertMessage = "Project created successfully";
                var project = {};
                project.projectName = $scope.projectForm.projectName;
                project.courseName ="SoftwareEngineering";
                project.softwareTools = $scope.projectForm.usedTools;
                project.expireDate = $scope.projectForm.projectExpireDate;
                $scope.gridOptions.data = $scope.list;
                $scope.list.push(project);
                $scope.gridOptions.data = $scope.list;

                $timeout( function(){
                    $scope.isCreatedSuccessfully = false;
                    $('#myModal').modal('hide');
                    }, 3000);
            };
            $scope.gridOptions = {
                enableRowSelection: true,
                enableSelectAll: true,
                selectionRowHeaderWidth: 5,
                rowHeight: 35,
                showGridFooter:false
            };

            $scope.gridOptions.columnDefs = [
                { name: "",
                    field : "check",
                    headerTemplate: '<input type=\"checkbox\"',
                    cellTemplate : '<input type=\"checkbox\" ng-model=\"{{COL_FIELD}}\" ng-true-value=\'Y\' ng-false-value=\'N\' />',
                    width: '1%',
                },

                { name: 'projectName',  field : 'projectName', width: '20%' },
                { name: 'courseName', field : 'courseName'},
                { name: 'softwareTools', field : 'softwareTools'},
                { name: 'expireDate', field: 'expireDate'}
            ];

            $scope.gridOptions.multiSelect = true;

            $scope.list = [];
            $scope.gridOptions.data = $scope.list;

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

