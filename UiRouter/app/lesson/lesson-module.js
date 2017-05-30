
/**
 * Created by sony on 17.04.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function (angular) {
    angular.module('myApp.lesson', ['ngRoute', 'ui.grid'])
        .controller('lessonCtrl', ['$scope', '$http', '$state', '$timeout', '$stateParams', '$q', '$window', '$cookies', function ($scope, $http, $state, $timeout, $stateParams, $q, $window, $cookies) {


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
                { name: 'Lesson', field: 'Name' },
                { name: 'Code', field: 'Kod' },
                { name: 'Term', field: 'Term' },
                { name: 'StudentCount', field: 'StudentCount' },
                { name: 'Teacher', field: 'Teacher' },
                { name: 'Asistant', field: 'Asistant' },
                { name: 'ProjectCount', field: 'ProjectCount' }
            ];

            //$scope.gridOptions2.data = [];
            // projeleri getir
            

                var LessonListService = 'http://ali.techlife.com.tr/api/Term/GetUserLessons?UserId=' + JSON.parse($cookies.UserInformations).Id;

                $http({ method: 'GET', url: LessonListService }).then(function successCallback(response) {
                    console.log(response.data)
                    var a = response.data;
                    $scope.gridOptions2.data = response.data;
                }, function errorCallback(response) {

                });
            




        }]);
});

