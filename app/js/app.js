(function() {
    var app = angular.module("SocialNetwork", [
        "app.controllers",
        "app.services",
        "ngRoute"
    ]);

    app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '../views/home.html',
            controller: 'HomeController'
        }).when('/profile', {
            templateUrl: '../views/user/editProfile.html',
            controller: 'ProfileController'
        }).when('/profile/password', {
            templateUrl: '../views/user/changePassword.html',
            controller: 'ProfileController'
        }).otherwise({ redirectTo: '/' });
    });

    app.run(function ($rootScope, $location, UtilsFactory) {
        $rootScope.$on('$locationChangeStart', function () {
            if ($location.path().indexOf("home") === -1 && !UtilsFactory.isLogged()) {
                $location.path("/");
            }
            if ($location.path().indexOf("home") !== -1 && UtilsFactory.isLogged()) {
                $location.path("/feed");
            }
        });
    });
})();
