(function() {
    var app = angular.module("SocialNetwork", [
        "app.controllers",
        "app.services",
        "app.directives",
        "app.filters",
        "ui.bootstrap",
        "ngRoute",
        "infinite-scroll"
    ]);

    app.constant('baseServiceUrl', 'http://softuni-social-network.azurewebsites.net/api');

    app.config(function ($routeProvider, $tooltipProvider) {
        $routeProvider.when('/', {
            templateUrl: '../views/home.html',
            controller: 'HomeController'
        }).when('/profile', {
            templateUrl: '../views/user/editProfile.html',
            controller: 'ProfileController'
        }).when('/profile/password', {
            templateUrl: '../views/user/changePassword.html',
            controller: 'ProfileController'
        }).when('/friendRequests', {
            templateUrl: '../views/friendRequests.html',
            controller: 'ProfileController'
        }).when('/users/:username', {
            templateUrl: 'views/user.html',
            controller: 'UsersController'
        }).when('/users/:username/friends', {
            templateUrl: 'views/friends.html',
            controller: 'UsersController'
        }).otherwise({ redirectTo: '/' });

        $tooltipProvider.setTriggers({
            'mouseenter': 'click',
            'click': 'click',
            'focus': 'blur',
            'never': 'mouseleave'
        });
    });

    app.run(function ($rootScope, $location, UtilsFactory) {

        $rootScope.isLogged = function() {
            return UtilsFactory.isLogged();
        };
    });
})();

$(document).click(function() { $('.popover').remove() });
