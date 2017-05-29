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
            $scope.projectDetails = {};
            var userIds = [];

            $scope.addComment = function(){
                $('#commentModal').modal('show');
            };

            $scope.cancelButtonClicked = function(){
                $state.go("teacher");
            }

            var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetProject?ProjectId=' + $stateParams.projectId;

            var getUserInformation = function(userIdList){
                _.each(userIdList, function(user){
                    var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetUser?UserId=' + user;
                    $http({ method: 'GET', url: projectDetailsService }).then(function successCallback(response) {
                        $scope.studentList.push(response.data);
                    }, function errorCallback(response) {
                        console.log("hata olustu..");
                    });
                })
            }

            $http({ method: 'GET', url: projectDetailsService }).then(function successCallback(response) {
                $scope.projectDetails = response.data;
                userIds = response.data.UserIds;
                getUserInformation(userIds);
            }, function errorCallback(response) {
                console.log("hata olustu..");
            });

            $scope.submitComment = function(){
                var SaveProjectService = 'http://ali.techlife.com.tr/api/Term/AddProjectComment';
                $http({
                    method: 'POST', url: SaveProjectService, data: {
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

            $scope.approveProject = function(){
                $('#approveModal').modal('show');
            }

            $scope.approveSubmitButton = function(){

                var approveProjectServiceUrl = 'http://ali.techlife.com.tr/api/Term/ApproveProject?ProjectId='
                    + $stateParams.projectId + '&Score=' + $scope.projectScore;

                $http({ method: 'POST', url: approveProjectServiceUrl }).then(function successCallback(response) {
                    if(response.data == true){
                        console.log(response);
                        $('#approveModal').modal('hide');
                    }
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                });
            }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});