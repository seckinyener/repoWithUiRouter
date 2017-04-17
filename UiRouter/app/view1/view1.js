'use strict';
define([
	'angular',
	'angularRoute'
], function(angular) {
	angular.module('myApp.view1', ['ngRoute'])
	.controller('View1Ctrl', ['$scope', '$http','$state', '$stateParams', function ($scope,$http,$state, $stateParams) {
		//$state.go("home2");
		
		$scope.login = function(){
			if($scope.userPassword.includes("1"))
				$state.go("teacherHome");
		}
	}]);
});

