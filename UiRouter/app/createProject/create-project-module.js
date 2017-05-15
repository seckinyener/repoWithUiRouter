/**
 * Created by sony on 11.05.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.createProject', ['ngRoute', 'ui.grid'])
        .controller('createProjectCtrl', ['$scope', '$http', '$state','$timeout', '$stateParams', function ($scope, $http, $state, $timeout, $stateParams) {

            var test = true;
            $scope.selectedStudents = [];
            var lessonId = $scope.selectedProject.lessonId;
            var userByLessonService = 'http://ali.techlife.com.tr/api/Term/GetUserByLesson?LessonId=' + lessonId
            $http({ method: 'GET', url: userByLessonService }).then(function successCallback(response) {
                $scope.students = response.data;
            }, function errorCallback(response) {
                var test = response;
            });

            $scope.studentList = [];

            $scope.submitProject = function(){
                var test = $scope.projectStudents;
            }
            $scope.addNewStudent = function(){
                var selectedRoleUser = { role : "student"};
                $scope.studentList.push(selectedRoleUser);
            }

            $scope.lastStudents= [];
            $scope.setStudent = function(){
                $scope.projectStudents = [];
                for(var i=0; i<$scope.selectedStudents.length; i++){
                    $scope.projectStudents.push ($scope.selectedStudents[i]);
                }
            }

            $scope.backToHomePage = function(){
                $state.go('student');
            }

            $scope.removeRow = function(index){
                $scope.studentList.splice(index,1);
                $scope.selectedStudents.splice(index, 1);
                $scope.projectStudents.splice(index,1);
            }

            $scope.addNewStudent();


            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});
