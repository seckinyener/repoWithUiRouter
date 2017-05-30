'use strict';

define([
    'angular',
    'angularRoute',
    'view1/view1',
    'view2/view2',
    'teacher/teacher-homeController',
    'angular-ui-router',
    'teacher/teacher-home-module',
    'projectDetails/details-module',
    'student/student-home-module',
    'createProject/create-project-module',
    'first/first-page-module',
    'archive/archive-module',
    'studentProjectDetails/student-project-details-module',
    'http://ajax.googleapis.com/ajax/libs/angularjs/1.3.19/angular-cookies.js'
], function(angular, angularRoute, view1, view2) {
    // Declare app level module which depends on views, and components
    return angular.module('myApp', [
        'ngRoute',
        'myApp.view1',
        'myApp.view2',
        'myApp.teacherHome',
        'ui.router',
        'myApp.teacherHome',
        'myApp.projectDetails',
        'myApp.studentHome',
        'myApp.createProject',
        'myApp.firstPage',
        'myApp.archive',
        'myApp.studentProjectDetails',
        'ngCookies'

    ]).
    config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {


        $stateProvider
            .state('home', {
                url: '/login',
                templateUrl: 'view1/view1.html'
            })
            .state('teacher', {
                url: '/teacher',
                templateUrl: 'teacher/teacher-home.html',
                params: {
                    sso: null,
                    password: null
                }
            })
            .state('details', {
                url: '/details',
                templateUrl: 'projectDetails/details.html',
                params: {
                    projectId: null
                }
            })

        .state('first', {
            templateUrl: 'first/first-page.html'
        })

        .state('first.student', {
            url: '/student',
            templateUrl: 'student/student-home.html',
        })

        .state('first.initProject', {
            url: '/initProject',
            templateUrl: 'createProject/create-project.html'
        })

        .state('archive', {
            url: '/archive',
            templateUrl: 'archive/archive.html'
        })

        .state('first.student-project-details', {
            url: '/project-details',
            templateUrl: 'studentProjectDetails/student-project-details.html'
        })


        $urlRouterProvider.otherwise('login');
    }])

    .controller('appController', ['$scope', '$http', '$state', '$cookies', '$rootScope', function($scope, $http, $state, $cookies, $rootScope) {

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            $scope.LoggedIn = false;
            if ($cookies.UserInformations == null) {
                // If logged out and transitioning to a logged in page:
                e.preventDefault();
                $state.go('home');
            } else {
                $scope.LoggedIn = true;
                $scope.UserName = JSON.parse($cookies.UserInformations).Name
            }
        });

        $scope.Logout = function() {
            delete $cookies['UserInformations'];
            $state.go("home");
        }

        $scope.test = true;
    }])


});
