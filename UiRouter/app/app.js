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
        /*$routeProvider

			.when('/view1', {
            	templateUrl: 'view1/view1.html',
            	controller: 'View1Ctrl'
        	})

        	.when('/view2', {
            	templateUrl: 'view2/view2.html',
            	controller: 'View2Ctrl'
        	})

			.when('/teacher', {
                templateUrl: 'teacher/teacher-home.html',
                controller: 'TeacherHomeCtrl'
			})

		$routeProvider.otherwise({redirectTo: '/view1'});*/

        $locationProvider.html5Mode({
			enabled:true,
            requireBase: false
		});

        $stateProvider
			.state('home', {
				url: '/view1',
                templateUrl: 'view1/view1.html',
                controller: 'View1Ctrl'
            })

		$urlRouterProvider.otherwise('home');
	}]);
});

