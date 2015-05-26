(function() {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("AuthenticationController", function($scope, UsersFactory, UtilsFactory) {
        $scope.fullName = '';
        $scope.email = '';
        $scope.username = '';
        $scope.password = '';
        $scope.remember = '';
        $scope.confirmPassword = '';
        $scope.gender = '0';

        $scope.logout = function () {
            UsersFactory.logout(function () {
                UtilsFactory.clearCredentials();
                UtilsFactory.refresh();
                $.notify('You have successfully logged out.', 'success');
            }, function () {
                $.notify('Error logging out.', 'error');
            });
        };

        $scope.login = function ($event) {
            if (!$scope.username || !$scope.password)
                return;

            UsersFactory.login($scope.username, $scope.password,
                function (data) {
                    UtilsFactory.setCredentials(data);
                    UtilsFactory.refresh();
                    $.notify('You have successfully logged in.', 'success');
                }, function () {
                    $.notify('The username or password is incorrect.', 'error');
                });
        };

        $scope.register = function () {
            if (!$scope.username
                || !$scope.password
                || !$scope.email
                || !$scope.fullName
                || !$scope.gender)
                return;
            if($scope.password != $scope.confirmPassword){
                $.notify('Passwords do no match.', 'error');
                return;
            }

            UsersFactory.register({
                Username: $scope.username,
                Password: $scope.password,
                ConfirmPassword: $scope.confirmPassword,
                Name: $scope.fullName,
                Email: $scope.email,
                Gender: $scope.gender
            }, function (data) {
                UtilsFactory.setCredentials(data);
                UtilsFactory.refresh();
                $.notify('You have successfully registered and logged in.', 'success');
            }, function () {
                $.notify('Registration data is incorrect.', 'error');
            });
        };
    });
})();
