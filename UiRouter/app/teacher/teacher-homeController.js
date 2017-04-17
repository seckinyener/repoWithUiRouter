/**
 * Created by sony on 16.04.2017.
 */
define([],function(){
    'use strict';
    var teacherPageController = function($scope){
        $scope.test = true;

        $scope.resultList = [{
            "studentName" : "Mike Charlton",
            "projectName" : "Test",
            "courseName" : "Se",
            "softwareTools" : "Java,Angular,SpringBoot"
            },
            {
                "studentName" : "Ryan Gosling",
                "projectName" : "Deneme",
                "courseName" : "Se",
                "softwareTools" : ".Net,Javascript"
            }];
    }
    teacherPageController.$inject = ['$scope'];
    return teacherPageController;
});