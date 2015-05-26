(function() {
    var app = angular.module("SocialNetwork", [
        "app.controllers",
        "app.services",
        "ngRoute"
    ]);

    app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '../partials/home.html',
            controller: 'HomeController'
        }).when('/FriendRequests', {
            templateUrl: 'views/friendRequests.html',
            controller: 'friendRequestsController'
        }).when('/Search/:id', {
            templateUrl: 'views/searchResults.html',
            controller: 'searchResultController'
        }).when('/EditProfile', {
            templateUrl: '../partials/user/editProfile.html',
            controller: 'UsersController'
        }).when('/ChangePassword', {
            templateUrl: '../partials/user/changePassword.html',
            controller: 'UsersController'
        }).otherwise({ redirectTo: '/' });
    });

    app.run(function ($rootScope, $location, UtilsFactory) {
        $rootScope.$on('$locationChangeStart', function () {
            if ($location.path().indexOf("welcome") === -1 && !UtilsFactory.isLogged()) {
                $location.path("/");
            }
            if ($location.path().indexOf("welcome") !== -1 && UtilsFactory.isLogged()) {
                $location.path("/feed");
            }
        });
    });
})();
