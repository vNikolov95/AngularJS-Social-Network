(function () {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("PostsController", function($scope, $rootScope, $routeParams, ProfileFactory, UsersFactory, PostsFactory, CommentsFactory) {
        $scope.news = [];

        $scope.postsParams = {
            'StartPostId' : "",
            'pageSize' : 5
        };

        $scope.submitPost = function() {
            PostsFactory.create($scope.newPost,
                function () {
                    $scope.newPost = "";
                   // $scope.userPosts.unshift(data);
                    //poppy.pop('success', 'success', 'Post published successfully');
                },
                function (serverError) {
                    //poppy.pop('error', 'error', 'Error publishing post \n' + serverError);
                });
        }

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

        $scope.getUserPosts = function() {
            $scope.busy = true;
            UsersFactory.getUserPosts($routeParams.username, $scope.postsParams,
                function (data) {
                    if(data.length == 0){
                        $scope.noMorePosts = true;
                    }else{
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

        $scope.likePost = function (post) {
            PostsFactory.like(post.id,
                function () {
                    post.liked = true;
                    post.likesCount++;
                    $.notify("Post liked successfully", 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.unlikePost = function (post) {
            PostsFactory.unlike(post.id,
                function () {
                    post.liked = false;
                    post.likesCount--;
                    $.notify("Post unliked successfully", 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.allCommentsClicked = function(clickedPost) {
            if(!clickedPost) {
                return;
            }
            $scope.selectedPost = clickedPost;
            $rootScope.showAll={};
            $scope.$broadcast("allCommentsClicked", clickedPost);
        };

        $scope.hideCommentsClicked = function(clickedPost) {
            $scope.selectedPost = clickedPost;
            $scope.$broadcast("hideCommentsClicked", clickedPost);
        };

        $scope.postComment = function () {
            CommentsFactory.create($scope.commentContent, $scope.post.id,
                function (data) {
                    $scope.commentContent = "";
                    $scope.post.comments.unshift(data);
                    $.notify("Comment successfully added", 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                });
        };

        $scope.editComment = function (currentComment, postId) {
            CommentsFactory.update(currentComment, postId,
                function () {
                    currentComment.commentContent = currentComment.newCommentContent;
                    currentComment.editing = false;
                    $.notify("Comment successfully edited", 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.deleteComment = function (currentPost, comment) {
            CommentsFactory.delete(comment.id, currentPost.id,
                function () {
                    var index =  currentPost.comments.indexOf(comment);
                    currentPost.comments.splice(index, 1);
                    $.notify("Comment successfully deleted", 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.likeComment = function (comment,post){
            CommentsFactory.likeComment(post.id, comment.id,
                function (data) {
                    comment.liked = true;
                    comment.likesCount++;
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.unlikeComment = function (comment,post){
            CommentsFactory.unlikeComment(post.id, comment.id,
                function () {
                    comment.liked = false;
                    comment.likesCount--;
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.deletePost = function(currentPost) {
            PostsFactory.delete(currentPost.id, function() {
                var index =  $scope.news.indexOf(currentPost);
                $scope.news.splice(index, 1);
                $.notify("Post deleted succesffully", 'success');
            }, function(serverError) {
                $.notify(serverError.message, 'error');
            });
        }

        $scope.editPost = function (currentPost) {
            PostsFactory.update(currentPost.id, currentPost.newPostContent,
                function () {
                    currentPost.postContent = currentPost.newPostContent;
                    currentPost.editing = false;
                    $.notify('Succesffully edited post', 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        };

        $scope.$on("allCommentsClicked", function(event, selectedPost) {
            PostsFactory.getComments(selectedPost.id,
                function (data) {
                    $scope.selectedPost.comments = data;
                    $rootScope.showAll[selectedPost.id] = true;
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                })
        });

        $scope.$on("hideCommentsClicked", function(event, selectedPost) {
            $scope.selectedPost.comments = selectedPost.comments.slice(0,3);
            $rootScope.showAll[selectedPost.id] = false;
        });
    });
})();

