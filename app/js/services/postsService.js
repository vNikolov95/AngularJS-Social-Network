(function () {
    "use strict";

    var app = angular.module("app.services");

    app.factory("PostsFactory", function ($http, UtilsFactory, baseServiceUrl) {
        var service = {};
        var serviceUrl = baseServiceUrl;

        service.create = function (content, success, error) {
            $http.post(serviceUrl + '/Posts', {
                PostContent: content,
                Username: UtilsFactory.getUsername(),
            }, {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.get = function (id, success, error) {
            $http.get(serviceUrl + '/Posts/' + id, {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.update = function (id, content, success, error) {
            $http.put(serviceUrl + '/Posts/' + id, {
                PostContent: content,
            }, {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.delete = function () {
            $http.delete(serviceUrl + '/Posts/' + id, {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.like = function (id, success, error) {
            $http.post(serviceUrl + '/Posts/' + id + '/likes', {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getLikesPreview = function (id, success, error) {
            $http.get(serviceUrl + '/Posts/' + id + '/likes/preview', {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getLikes = function (id, success, error) {
            $http.get(serviceUrl + '/Posts/' + id + '/likes', {
                headers: UtilsFactory.getHeaders(),
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

    service.deleteLikes = function (id, success, error) {
        $http.delete(serviceUrl + '/Posts/' + id + '/likes', {
            headers: UtilsFactory.getHeaders(),
        }).success(function (data, status, headers, config) {
            success(data);
        }).error(function (data) {
            error(data);
        });
    };

    return service;
});

    app.factory("CommentsFactory", function ($http, UtilsFactory, baseServiceUrl) {
        var service = {};
        var serviceUrl = baseServiceUrl;

        service.create = function (content, postId, success, error) {
            $http.post(serviceUrl + '/posts/' + postId + '/comments', {
                CommentContent: content,
            }, {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.update = function (commentId, postId, content, success, error) {
            $http.put(serviceUrl + '/posts/' + postId + '/comments/' + commentId, {
                CommentContent: content,
            }, {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.delete = function (commentId, postId, success, error) {
            $http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId, {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.getPostComments = function (postId, success, error) {
            $http.get(serviceUrl + '/posts/' + postId + '/comments', {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.getPostCommentLikes = function (postId, commentId, success, error) {
            $http.get(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.getPostCommentLikesPreview = function (postId, commentId, success, error) {
            $http.get(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes/preview', {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.likePostComment = function (postId, commentId, success, error) {
            $http.post(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.deletePostCommentLike = function (postId, commentId, success, error) {
            $http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        return service;
    });
}());