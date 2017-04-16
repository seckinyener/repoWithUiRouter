'use strict';
define([
	'angular',
	'angularRoute',
	'angular-ui-router'
], function(angular) {
	angular.module('myApp.view1', ['ngRoute'])
	.controller('View1Ctrl', ['$scope','state', function($scope, $state) {
		$scope.test = true;
		$scope.clickFunction = function(){
			$state.go("teacher");
		};
	}]);
});

