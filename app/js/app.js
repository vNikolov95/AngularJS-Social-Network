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
            templateUrl: 'views/editProfile.html',
            controller: 'editProfileController'
        }).when('/ChangePassword', {
            templateUrl: 'views/changePassword.html',
            controller: 'changePasswordController'
        }).otherwise({ redirectTo: '/' });
    });
})();
