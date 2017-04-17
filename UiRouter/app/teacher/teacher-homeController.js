/**
 * Created by sony on 16.04.2017.
 */
define([],function(){
    'use strict';
    var teacherPageController = function($scope){
        $scope.test = true;
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
    }
    teacherPageController.$inject = ['$scope'];
    return teacherPageController;
});