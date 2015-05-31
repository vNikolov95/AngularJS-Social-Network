(function () {
    "use strict";

    var app = angular.module("app.services", []);

    app.factory("UtilsFactory", function ($route) {
        var service = {};

        service.setCredentials = function (serverData) {
            localStorage['sessionToken'] = serverData.access_token;
            localStorage['username'] = serverData.userName;

            var now = Date.now();
            now += serverData.expires_in;

            localStorage['expires'] = new Date(now);
        };

        service.setProfileImage = function (profileImage) {
            localStorage['profileImage'] = profileImage;
        }

        service.getProfileImage = function () {
            return localStorage['profileImage'];
        }

        service.getUsername = function () {
            return localStorage['username'];
        };

        service.clearCredentials = function () {
            localStorage.clear();
        };

        service.getBase = function (method, url) {
            var header = this.getHeader();

            return {
                method: method,
                url: url,
                headers: {
                    Authorization: header
                }
            };
        };

        service.getHeader = function () {
            return "Bearer " + localStorage['sessionToken'];
        };

        service.getHeaders = function () {
            return {
                Authorization: "Bearer " + localStorage['sessionToken']
            };
        };

        service.isLogged = function () {
            var session = localStorage['sessionToken'];
            var expires = localStorage['expires'];
            var isExpired = Date.now() < expires;

            return !!session && !isExpired;
        };

        service.refresh = function () {
            $route.reload();
        };

        return service;
    });
}());