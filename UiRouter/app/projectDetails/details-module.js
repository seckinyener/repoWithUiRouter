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
                window.history.back();
            }

            var projectDetailsService = 'http://ali.techlife.com.tr/api/Term/GetProject?ProjectId=' + $stateParams.projectId;

            var getProjectComments = function(projectId) {
                var commentService = 'http://ali.techlife.com.tr/api/Term/GetProjectComments?ProjectId=' + projectId;
                $http({ method: 'GET', url: commentService }).then(function successCallback(response) {
                    $scope.comments = response.data;
                    for (var i = 0; i < $scope.comments.length;i++ )
                    {
                        $scope.comments[i].CreateDate = new Date($scope.comments[i].CreateDate).toLocaleDateString() + "  " + new Date($scope.comments[i].CreateDate).toLocaleTimeString();
                        //console.log($scope.comments[i].CreateDate.toLocaleDateString());
                    }
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                });
            }

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
                getProjectComments(response.data.Id);
                $scope.ProjectId = response.data.Id;
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
                    
                    $state.go($state.current, {}, { reload: true });
                    console.log($scope.comments);
                    $('.modal').remove();
                    $('.modal-backdrop').remove();
                    $('body').removeClass("modal-open");
                  
                    
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
                        $('.modal').remove();
                        $('.modal-backdrop').remove();
                        $('body').removeClass("modal-open");
                        //$('#approveModal').modal('hide');
                       // alert("Project has been approved successfully.");
                        $state.go("teacher");
                    }
                }, function errorCallback(response) {
                    console.log("hata olustu..");
                    scope.alert("Project could not be saved.");
                });
            }

            $(function () { $("[data-toggle = 'tooltip']").tooltip(); });
        }]);
});