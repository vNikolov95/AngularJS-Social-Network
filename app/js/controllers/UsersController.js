/**
 * Created by Valentin Nikolov on 26.5.2015 ã..
 */
(function() {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("UsersController", function($scope, ProfileFactory, UsersFactory, UtilsFactory) {
        $scope.menuOpened = false;
        $scope.noResults = true;

        $scope.searchUsersByName = function (term) {
            if(term.length > 0){
                UsersFactory.search(term,
                    function (data) {
                        $scope.foundUsers = data;
                        $scope.noResults = false;
                        if(data.length == 0)
                            $scope.noResults = true;
                    },
                    function (serverError) {
                        $scope.noResults = true;
                    });
            }
        };

        $scope.showResults = function () {
            $scope.menuOpened = true;
        }

        $scope.hideResults = function () {
            $scope.menuOpened = false;
        }
    });
})();
