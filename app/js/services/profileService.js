(function () {
    "use strict";

    var app = angular.module("app.services");

    app.factory("ProfileFactory", function ($http, UtilsFactory, baseServiceUrl) {
        var service = {};
        var serviceUrl = baseServiceUrl;

        service.get = function (success, error) {
            $http.get(serviceUrl + '/me', {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        }

        service.update = function (data, success, error) {
            $http.put(serviceUrl + '/me', data, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.changePassword = function (oldPass, newPass, ConPass, success, error) {
            $http.put(serviceUrl + '/me/changepassword', {
                OldPassword: oldPass,
                NewPassword: newPass,
                ConfirmPassword: ConPass,
            }, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        }

        service.getFriends = function (success, error) {
            $http.get(serviceUrl + '/me/friends', {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getFriendsPreview = function (success, error) {
            $http.get(serviceUrl + '/me/friends/preview', {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getNewsFeed = function (params, success, error) {
            $http.get(serviceUrl + '/me/feed', {
                params: params,
                headers: UtilsFactory.getHeaders()
            }).success(function (data) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getFriendRequests = function (success, error) {
            $http.get(serviceUrl + '/me/requests', { headers: UtilsFactory.getHeaders() })
                .success(function (data, status, headers, config) {
                    success(data);
                }).error(function (data) {
                    error(data);
                });
        };

        service.sendFriendRequest = function (username, success, error) {
            $http.post(serviceUrl + '/me/requests/' + username, null, {
                headers: UtilsFactory.getHeaders()
            }).success(success).error(error);
        };

        service.acceptFriendRequest = function (id, success, error) {
            $http.put(serviceUrl + '/me/requests/' + id + '?status=approved', {}, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        }

        service.rejectFriendRequest = function (id, success, error) {
            $http.put(serviceUrl + '/me/requests/' + id + '?status=delete', {}, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        }

        return service;
    });
}());