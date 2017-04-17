/**
 * Created by sony on 17.04.2017.
 */
'use strict';
define([
    'angular',
    'angularRoute'
], function(angular) {
    angular.module('myApp.projectDetails', ['ngRoute'])
        .controller('detailsCtrl', ['$scope', '$http','$state', '$stateParams', function ($scope,$http,$state, $stateParams) {

        }]);
});