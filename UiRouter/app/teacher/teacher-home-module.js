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
    angular.module('myApp.teacherHome', ['ngRoute', 'ui.grid'])
        .controller('teacherHomeCtrl', ['$scope', '$http', '$state','$timeout', function ($scope, $http, $state, $timeout) {

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
                $scope.myOpenProjectList.push(project);

                var table = document.getElementById("openProjects");
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = $scope.projectForm.projectName;
                cell2.innerHTML = project.courseName;
                cell3.innerHTML = $scope.projectForm.usedTools;
                cell4.innerHTML = $scope.projectForm.projectExpireDate;

                $timeout( function(){
                    $scope.isCreatedSuccessfully = false;
                    $('#myModal').modal('hide');
                    }, 3000);
            };
            $scope.gridOptions = {
                enableRowSelection: true,
                enableSelectAll: true,
                selectionRowHeaderWidth: 35,
                rowHeight: 35,
                showGridFooter:true
            };

            $scope.gridOptions.columnDefs = [
                { name: 'studentName' },
                { name: 'projectName'},
                { name: 'courseName', displayName: 'Age (not focusable)', allowCellFocus : false },
                { name: 'softwareTools' },
                { name: 'expireDate' }
            ];

            $scope.gridOptions.multiSelect = true;

            $scope.gridOptions.data = $scope.resultList;

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

