'use strict';

define([
	'angular',
	'angularRoute',
	'view1/view1',
	'view2/view2',
	'teacher/teacher-homeController',
	'angular-ui-router',
	'teacher/teacher-home-module',
	'projectDetails/details-module'
], function(angular, angularRoute, view1, view2) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'myApp.view1',
		'myApp.view2',
		'myApp.teacherHome',
		'ui.router',
		'myApp.teacherHome',
		'myApp.projectDetails'
	]).
	config(['$routeProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', function($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
			.state('login', {
				url: '/login',
                templateUrl: 'view1/view1.html'
            })
			.state('teacherHome', {
				url: '/teacher',
                templateUrl: 'teacher/teacher-home.html'
            })
			.state('details', {
                url: '/details',
                templateUrl: 'projectDetails/details.html'
			})
			

		$urlRouterProvider.otherwise('login');
	}]);
});

