/**
 * Created by sony on 17.04.2017.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.projectDetails', ['ngRoute', 'ui.bootstrap'])
        .controller('detailsCtrl', ['$scope', '$http','$state', '$stateParams', function ($scope,$http,$state, $stateParams) {
            $scope.studentList = [];
            var student1 = "Seckin Yener";
            var student2 = "Ali Bolu";
            var student3 = "Can";
            $scope.studentList.push(student1);
            $scope.studentList.push(student2);
            $scope.studentList.push(student3);

            $scope.selected = undefined;
            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

            $scope.addComment = function(){
                $('#commentModal').modal('show');
            };

            $scope.cancelButtonClicked = function(){
                $state.go("teacher");
            }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});