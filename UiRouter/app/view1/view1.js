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
				if(response.data != null)
				{
					$state.go("teacherHome");
				}
				else
				{
					alert('Kullanıcı adı ve/veya şifre hatalı');
				}
				
			}, function errorCallback(response) {
				
			});
		}

	}]);
});

