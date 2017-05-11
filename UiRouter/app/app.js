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
	'student/student-home-module'
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
		'myApp.studentHome'
	]).
	config(['$routeProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', function($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
			.state('home', {
				url: '/login',
                templateUrl: 'view1/view1.html'
            })
			.state('teacher', {
				url: '/teacher',
                templateUrl: 'teacher/teacher-home.html',
				params : {
					sso : null,
					password : null
				}
            })
			.state('details', {
                url: '/details',
                templateUrl: 'projectDetails/details.html'
			})

			.state('student', {
                url: '/student',
                templateUrl: 'student/student-home.html',
                params : {
                    sso : null,
                    password : null
                }
            })
			

		$urlRouterProvider.otherwise('login');
	}])

        .controller('appController', ['$scope', '$http','$state', '$stateParams', function ($scope,$http,$state) {
            //$state.go("home2");

            $scope.test = true;
        }]);
});

