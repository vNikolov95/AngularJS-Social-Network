(function () {
	"use strict"
	var app = angular.module("app.controllers", []);

	app.controller("HomeController", function($scope, UsersFactory, UtilsFactory) {
        if (UtilsFactory.isLogged()) {
            $scope.menu = 'views/partials/menu.html';
            $scope.feed = 'views/feed.html';
            return;
        }

        $scope.showTitle = true;
        $scope.loginForm = 'views/partials/loginForm.html';
        $scope.registerForm = '';
        $scope.loginLink = true;

        $scope.showLogin = function () {
            $scope.loginForm = 'views/partials/loginForm.html';
            $scope.registerForm = '';
        };

        $scope.showRegister = function () {
            $scope.registerForm = 'views/partials/registerForm.html';
            $scope.loginForm = '';
        };
	});
})();

