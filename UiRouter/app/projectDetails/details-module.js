/**
 * Created by sony on 17.04.2017.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.projectDetails', ['ngRoute'])
        .controller('detailsCtrl', ['$scope', '$http','$state', '$stateParams', function ($scope,$http,$state, $stateParams) {
            $scope.studentList = [];
            var student1 = "Seckin Yener";
            var student2 = "Ali Bolu";
            var student3 = "Can";
            $scope.studentList.push(student1);
            $scope.studentList.push(student2);
            $scope.studentList.push(student3);

            $scope.addComment = function(){
                $('#commentModal').modal('show');
            };

            $scope.cancelButtonClicked = function(){
                $state.go("teacherHome");
            }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});