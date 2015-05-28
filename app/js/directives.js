(function () {
    "use strict";

    var app = angular.module("app.directives", []);

    app.directive('menu', function () {
        return {
            restrict: 'EA',
            replace: true,
            controller: function ($scope, ProfileFactory) {
                ProfileFactory.get(function (data) {
                    $scope.user = data;

                    if (!data.profileImageData)
                        $scope.user.profileImageData = 'img/avatar.gif';
                    if (!data.coverImageData)
                        $scope.user.coverImageData = 'img/cover.gif';

                }, function (data) {
                });
            },
            templateUrl: '../views/directives/menu.html'
        }
    });
}());