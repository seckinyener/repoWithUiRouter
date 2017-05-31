'use strict';
define([
    'angular',
    'angularRoute',
], function(angular) {
    angular.module('myApp.view1', ['ngRoute'])
        .controller('View1Ctrl', ['$scope', '$http', '$state', '$cookies', function($scope, $http, $state, $cookies) {
            //$state.go("home2");

            if ($cookies.UserInformations != null) {
                // If logged out and transitioning to a logged in page:
                if (JSON.parse($cookies.UserInformations).RoleId == 1)
                    $state.go("first")

                if (JSON.parse($cookies.UserInformations).RoleId == 2)
                    $state.go("teacher")



            }

            $scope.login = function() {

                var LoginServiceUrl = 'http://ali.techlife.com.tr/api/Term/Login?UserName=' +
                    $scope.username + '&Password=' + $scope.userPassword;
                console.log(LoginServiceUrl);

                $http({ method: 'GET', url: LoginServiceUrl }).then(function successCallback(response) {
                    console.log(response);

                    if (response.data == null) {
                        $scope.alert("username or password wrong.");
                    } else {
                        //kullanıcı bilgileri cookie ye atılır.
                        var UserInformations = {
                            Id: response.data.Id,
                            Name: response.data.Name,
                            RoleId: response.data.RoleId,
                            Email: response.data.Email
                        }

                        // $cookies.put('UserInformations', 'dsads');
                        $cookies.UserInformations = JSON.stringify(UserInformations);
                        console.log($cookies.UserInformations);

                        //login başarılı mı?
                        if (response.data.RoleId === 2) {

                            $state.go("teacher", { sso: $scope.username, password: $scope.userPassword });
                        } else if (response.data.RoleId === 1) {
                            $state.go("first");
                        }
                    }





                }, function errorCallback(response) {

                });
            }

        }]);
});