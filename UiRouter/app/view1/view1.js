'use strict';
define([
	'angular',
	'angularRoute'
], function(angular) {
	angular.module('myApp.view1', ['ngRoute'])
	.controller('View1Ctrl', ['$scope', '$http','$state', '$stateParams', function ($scope,$http,$state, $rootScope) {
		//$state.go("home2");

		$scope.login = function(){
			if($scope.userPassword.includes("1")) {
                $state.go('teacher', { sso : $scope.username, password: $scope.userPassword});
            }else
            	$state.go('student', {sso: $scope.username, password : $scope.userPassword});
		};
	}]);
});

