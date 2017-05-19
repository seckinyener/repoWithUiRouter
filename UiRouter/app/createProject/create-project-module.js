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
            $scope.showProjectCreationForm = false;
            $scope.saveProjectForm = {};

            var lessonId = $scope.selectedProject.lessonId;
            var userByLessonService = 'http://ali.techlife.com.tr/api/Term/GetUserByLesson?LessonId=' + lessonId
            $http({ method: 'GET', url: userByLessonService }).then(function successCallback(response) {
                $scope.students = response.data;
            }, function errorCallback(response) {
                var test = response;
            });

            var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetProjectDesc?ProjectDescId=' +$scope.selectedProject.projectId

            $http({
                method: 'GET',
                url: projectDetailsService
            }).then(function successCallback(response) {
                $scope.projectDetails= response.data;
            }, function errorCallback(response) {

            });

            $scope.studentList = [];

            $scope.createProject = function(){
                $scope.showProjectCreationForm = true;


            }

            $scope.submitProject = function(){
                var SaveProjectService = 'http://ali.techlife.com.tr/api/Term/SaveProject';

                $http({
                    method: 'POST', url: SaveProjectService, data: {
                        "Id": 0,
                        "ProjectDescId": $scope.selectedProject.projectId,
                        "Name": $scope.saveProjectForm.name,
                        "CreateDate": "2017-05-17T21:06:57.505Z",
                        "FileName": "sec",
                        "Description": $scope.saveProjectForm.description,
                        "Score": 0,
                        "TeacherNote": "asd",
                        "isAccept": true,
                        "userIds": $scope.projectStudents
                    }

                }).then(function successCallback(response) {
                    if(response.data === "success")
                    {
                        alert("proje basarili bir sekilde kaydedildi.");
                    }
                    else
                    {
                        alert("proje kaydedilemedi.");
                    }

                }, function errorCallback(response) {
                    var hata = true;
                });
                var test = true;
            }

            $scope.onFileSelect = function(file){
                var fi = file;
            }


            $scope.addNewStudent = function(){
                var selectedRoleUser = { role : "student"};
                $scope.studentList.push(selectedRoleUser);
            }

            $scope.lastStudents= [];
            $scope.setStudent = function(){
                $scope.projectStudents = [];
                for(var i=0; i<$scope.selectedStudents.length; i++){
                    $scope.projectStudents.push ($scope.selectedStudents[i].Id);
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
