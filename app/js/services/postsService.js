(function () {
    "use strict";

    var app = angular.module("app.services");

    app.factory("PostsFactory", function ($http, UtilsFactory, baseServiceUrl) {
        var service = {};
        var serviceUrl = baseServiceUrl;

        service.create = function (content, success, error) {
            $http.post(serviceUrl + '/Posts', {
                PostContent: content,
                Username: UtilsFactory.getUsername()
            }, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data) {
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

        service.delete = function (postId, success, error) {
            $http.delete(serviceUrl + '/Posts/' + postId, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.unlike = function (postId, success, error) {
            $http.delete(serviceUrl + '/Posts/' + postId + '/likes', {
                headers: UtilsFactory.getHeaders()
            }).success(function (data) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.like = function (postId, success, error) {
            $http.post(serviceUrl + '/Posts/' + postId + '/likes', null, {
                headers: UtilsFactory.getHeaders()
            }).success(function (data) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getLikes = function (id, success, error) {
            $http.get(serviceUrl + '/Posts/' + id + '/likes', {
                headers: UtilsFactory.getHeaders()
            }).success(function (data, status, headers, config) {
                success(data);
            }).error(function (data) {
                error(data);
            });
        };

        service.getComments = function (postId, success, error) {
            $http.get(serviceUrl + '/Posts/' + postId + '/comments', {
                headers: UtilsFactory.getHeaders()
            }).success(function (data) {
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
                CommentContent: content
            }, {
                headers: UtilsFactory.getHeaders()
            }).success(success).error(error);
        };

        service.update = function (comment, postId, success, error) {
            $http.put(serviceUrl + '/posts/' + postId + '/comments/' + comment.id, {
                CommentContent: comment.newCommentContent
            }, {
                headers: UtilsFactory.getHeaders()
            }).success(success).error(error);
        };

        service.delete = function (commentId, postId, success, error) {
            $http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId, {
                headers: UtilsFactory.getHeaders()
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

        service.likeComment = function (postId, commentId, success, error) {
            $http.post(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', null, {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        service.unlikeComment = function (postId, commentId, success, error) {
            $http.delete(serviceUrl + '/posts/' + postId + '/comments/' + commentId + '/likes', {
                headers: UtilsFactory.getHeaders(),
            }).success(success).error(error);
        };

        return service;
    });
}());