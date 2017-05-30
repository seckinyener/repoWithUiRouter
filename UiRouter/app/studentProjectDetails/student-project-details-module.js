/**
 * Created by sony on 17.04.2017.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.studentProjectDetails', ['ngRoute', 'ui.bootstrap', 'ngFileUpload'])
        .controller('studentProjectDetailsCtrl', ['$scope', '$http', '$state', '$stateParams', 'Upload', function($scope, $http, $state, $stateParams, Upload) {
            $scope.studentList = [];
            $scope.projectDetails = {};
            var userIds = [];

            $scope.addComment = function() {
                $('#commentModal').modal('show');
            };

            $scope.cancelButtonClicked = function() {
                $state.go("first.student");
            }

            var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetProject?ProjectId=' + $scope.selectedProject.myProjectId;

            var getUserInformation = function(userIdList) {
                _.each(userIdList, function(user) {
                    var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetUser?UserId=' + user;
                    $http({ method: 'GET', url: projectDetailsService }).then(function successCallback(response) {
                        $scope.studentList.push(response.data);
                    }, function errorCallback(response) {
                        console.log("hata olustu..");
                    });
                })
            }

            $scope.comments = [];
            var getProjectComments = function(projectId) {
                var commentService = 'http://ali.techlife.com.tr/api/Term/GetProjectComment?ProjectId=' + projectId;
                $http({ method: 'GET', url: projectDetailsService }).then(function successCallback(response) {
                    $scope.comments.push(response.data);
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                });
            }

            $http({ method: 'GET', url: projectDetailsService }).then(function successCallback(response) {
                $scope.projectDetails = response.data;
                userIds = response.data.UserIds;
                if (response.data.Status === "Waiting") {
                    getProjectComments(response.data.Id);
                }
                getUserInformation(userIds);
            }, function errorCallback(response) {
                console.log("hata olustu..");
            });

            $scope.submitComment = function() {
                var SaveProjectService = 'http://ali.techlife.com.tr/api/Term/AddProjectComment';
                $http({
                    method: 'POST',
                    url: SaveProjectService,
                    data: {
                        "Id": 0,
                        "ProjectId": $stateParams.projectId,
                        "UserId": 4,
                        "Comment": $scope.teacherComment,
                        "CreateDate": new Date(),
                        "IsDelete": false
                    }

                }).then(function successCallback(response) {
                    var test = response.data;
                    $('#commentModal').modal('hide');
                }, function errorCallback(response) {
                    var fail = response;
                });

            }

            //angular-file-upload example

            $scope.uploadFile = function() {

                if (document.getElementById("upload").value != "") {
                    var file = document.getElementById("upload").files[0];
                    var filePath = "....";
                    if (window.FormData !== undefined) {
                        var data = new FormData();
                        data.append("file", file);
                        //var encodedString = Base64.encode(filePath);
                        console.log(data);
                        console.log(file);
                        // $.ajax({
                        //     type: "POST",
                        //     url: "/API/document/upload/" + file.name + "/" + encodedString,
                        //     contentType: false,
                        //     processData: false,
                        //     data: data,
                        //     success: function(result) {
                        //         console.log(result);
                        //     },
                        //     error: function(xhr, status, p3, p4) {
                        //         var err = "Error " + " " + status + " " + p3 + " " + p4;
                        //         if (xhr.responseText && xhr.responseText[0] == "{")
                        //             err = JSON.parse(xhr.responseText).Message;
                        //         console.log(err);
                        //     }
                        // });
                    }
                }

            };



            $(function() { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});