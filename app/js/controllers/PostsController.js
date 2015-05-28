(function () {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("PostsController", function($scope, ProfileFactory) {
        $scope.news = [];

        $scope.postsParams = {
            'StartPostId' : "",
            'pageSize' : 10
        };

        $scope.getNewsFeedPosts = function () {
            $scope.busy = true;

            ProfileFactory.getNewsFeed($scope.postsParams,
                function (data) {
                    if(data.length == 0){
                        $scope.noMorePosts = true;
                    } else if(data.length < 3){
                        $scope.postsParams.StartPostId = data[data.length-1].id;
                        $scope.news = data;
                    } else{
                        $scope.postsParams.StartPostId = data[data.length-1].id;
                        for (var i = 0; i < data.length; i++) {
                            $scope.news.push(data[i]);
                        }
                    }
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };
    });
})();

