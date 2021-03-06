/**
 * Created by sony on 11.05.2017.
 */

'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.createProject', ['ngRoute', 'ui.grid'])
        .controller('createProjectCtrl', ['$scope', '$http', '$state', '$timeout', '$stateParams', '$location', '$anchorScroll', function($scope, $http, $state, $timeout, $stateParams, $location, $anchorScroll) {

            var test = true;
            $scope.selectedStudents = [];
            $scope.showProjectCreationForm = false;
            $scope.saveProjectForm = {};
            $scope.createButtonClicked = false;

            var lessonId = $scope.selectedProject.lessonId;
            var userByLessonService = 'http://ali.techlife.com.tr/api/Term/GetUserByLesson?LessonId=' + lessonId
            $http({ method: 'GET', url: userByLessonService }).then(function successCallback(response) {
                $scope.students = response.data;
            }, function errorCallback(response) {
                var test = response;
            });

            var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetProjectDesc?ProjectDescId=' + $scope.selectedProject.projectId

            $http({
                method: 'GET',
                url: projectDetailsService
            }).then(function successCallback(response) {
                $scope.projectDetails = response.data;
            }, function errorCallback(response) {

            });

            $scope.studentList = [];

            $scope.createProject = function() {
                $scope.showProjectCreationForm = true;

                $location.hash('projectCreation');
                $anchorScroll();
            }

            $scope.submitProject = function() {
                var SaveProjectService = 'http://ali.techlife.com.tr/api/Term/SaveProject';

                var file = document.getElementById("upload").files[0];
                console.log(file.name);
                $http({
                    method: 'POST',
                    url: SaveProjectService,
                    data: {
                        "Id": 0,
                        "ProjectDescId": $scope.selectedProject.projectId,
                        "Name": $scope.saveProjectForm.name,
                        "CreateDate": "2017-05-17T21:06:57.505Z",
                        "FileName": "ali.techlife.com.tr/upload/" + file.name,
                        "Description": $scope.saveProjectForm.description,
                        "Detail": $scope.saveProjectForm.detail,
                        "Score": 0,
                        "TeacherNote": "asd",
                        "isAccept": true,
                        "userIds": $scope.projectStudents
                    }

                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data == true) {
                        //scope.alert("Project has been saved successfully.");
                        $scope.backToHomePage();
                    } else {
                        $scope.alert("Project could not been saved!");
                    }

                }, function errorCallback(response) {
                    var hata = true;
                });
                var test = true;
            }

            $scope.onFileSelect = function() {

                if (document.getElementById("upload").value != "") {
                    var file = document.getElementById("upload").files[0];
                    var filePath = "....";
                    if (window.FormData !== undefined) {
                        var data = new FormData();
                        data.append("file", file);
                        console.log(data);
                        console.log(file);
                        $.ajax({
                            type: "POST",
                            url: "http://ali.techlife.com.tr/api/Term/FileUpload",
                            contentType: false,
                            processData: false,
                            data: data,
                            success: function(result) {
                                console.log(result);
                            },
                            error: function(xhr, status, p3, p4) {
                                var err = "Error " + " " + status + " " + p3 + " " + p4;
                                if (xhr.responseText && xhr.responseText[0] == "{")
                                    err = JSON.parse(xhr.responseText).Message;
                                console.log(err);
                            }
                        });
                    }
                }
            }


            $scope.addNewStudent = function() {
                var selectedRoleUser = { role: "student" };
                $scope.studentList.push(selectedRoleUser);
            }

            $scope.lastStudents = [];
            $scope.setStudent = function() {
                $scope.projectStudents = [];
                for (var i = 0; i < $scope.selectedStudents.length; i++) {
                    $scope.projectStudents.push($scope.selectedStudents[i].Id);
                }
                console.log($scope.projectStudents);
            }

            $scope.backToHomePage = function() {
                $state.go('first.student');
            }

            $scope.removeRow = function(index) {
                $scope.studentList.splice(index, 1);
                $scope.selectedStudents.splice(index, 1);
                $scope.projectStudents.splice(index, 1);
            }

            $scope.addNewStudent();


            $(function() { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});