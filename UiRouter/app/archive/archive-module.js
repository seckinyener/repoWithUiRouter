
/**
 * Created by sony on 17.04.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function (angular) {
    angular.module('myApp.archive', ['ngRoute', 'ui.grid'])
        .controller('archiveCtrl', ['$scope', '$http', '$state', '$timeout', '$stateParams', '$q', '$window', function ($scope, $http, $state, $timeout, $stateParams, $q, $window) {
            $scope.studentProjectList = [];
            var selectedProjectId;
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
                { name: 'Lesson', field: 'LessonName' },
                { name: 'Description', field: 'Description' },
                { name: 'Score', field: 'Score' },
                { name: 'Status', field: 'Status' },
            ];
            $scope.searchProjects = function () {
                var ProjectName = $scope.searchParameters.projectName;
                var ProjectId = $scope.searchParameters.projectId;
                var StudentNo = $scope.searchParameters.studentName;
                if (!ProjectName) {
                    ProjectName = "";
                }
                if (!StudentNo)
                {
                    StudentNo = "";
                }
                if (!ProjectId)
                {
                    ProjectId = 0;
                }
                   
              
                var studentProjectsService = 'http://ali.techlife.com.tr/api/Term/SearchProjects?ProjectId=' + ProjectId + '&StudentNo=' + StudentNo + '&ProjectName=' + ProjectName;
                $http({ method: 'GET', url: studentProjectsService }).then(function successCallback(response) {
                    if (response.data.length>0)
                    {
                        console.log(response.data)
                        $scope.studentProjectList = response.data
                        $scope.gridOptions2.data = response.data;
                    }
                    else
                    {
                        $scope.alert('Sonuç bulunamadı.')
                    }
                 
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                });
            }
           

            $scope.selectStudentProject = function (entity) {
                selectedProjectId = entity.Id;
            }

            $scope.showDetails = function () {
                $state.go('details', { projectId: selectedProjectId });
            }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});

