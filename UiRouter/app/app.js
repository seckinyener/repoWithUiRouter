'use strict';

define([
	'angular',
	'angularRoute',
	'view1/view1',
	'view2/view2',
	'teacher/teacher-homeController',
	'angular-ui-router'
], function(angular, angularRoute, view1, view2, teacherHomeCtrl) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'myApp.view1',
		'myApp.view2',
		'myApp.teacherHome',
		'ui.router'
	]).
	config(['$routeProvider','$stateProvider', '$urlRouterProvider', '$locationProvider', function($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        

        $stateProvider
			.state('home', {
				url: '/view1',
                templateUrl: 'view1/view1.html'
            })
			.state('home2', {
				url: '/view2',
                templateUrl: 'view2/view2.html'
            })
			

		$urlRouterProvider.otherwise('home');
	}]);
});

