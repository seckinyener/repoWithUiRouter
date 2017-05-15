'use strict';
define([
	'angular',
	'angularRoute'
], function(angular) {
	angular.module('myApp.view1', ['ngRoute'])
	.controller('View1Ctrl', ['$scope', '$http','$state', function ($scope,$http,$state) {
		//$state.go("home2");

		$scope.login = function(){
			
			var LoginServiceUrl = 'http://ali.techlife.com.tr/api/Term/Login?UserName='
				+ $scope.username + '&Password=' + $scope.userPassword;
			console.log(LoginServiceUrl);

			$http({method:'GET',url:LoginServiceUrl}).then(function successCallback(response) {
				console.log(response);
				//login başarılı mı?
				if(response.data.RoleId === 2)
				{

					$state.go("teacher", { sso: $scope.username, password : $scope.userPassword});
				}
				else if(response.data.RoleId === 1)
				{
                    $state.go("student", { sso: $scope.username, password : $scope.userPassword});
				}
				
			}, function errorCallback(response) {
				
			});
		}

	}]);
});

