(function () {
	"use strict"
	var app = angular.module("app.controllers", []);

	app.controller("HomeController", function($scope, UsersFactory, UtilsFactory) {
		$scope.title = "Kiro";
	});

})();

