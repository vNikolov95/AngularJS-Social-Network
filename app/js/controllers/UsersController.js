/**
 * Created by Valentin Nikolov on 26.5.2015 �..
 */
(function() {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("UsersController", function($scope, $routeParams, $location, ProfileFactory, UsersFactory, UtilsFactory) {
        $scope.menuOpened = false;
        $scope.noResults = true;

        var username = $routeParams.username;

        $scope.getUserData = function() {
            if(!username) {
                $location.path('/');
            }
            else {
                UsersFactory.get(username, function (data) {
                    $scope.userData = data;
                }, function (serverError) {
                    $location.path('/');
                });
            }
        };

        $scope.getDataAboutMe = function () {
            ProfileFactory.get(
                function (serverData) {
                    $scope.myData = serverData;
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                });

        };

        $scope.searchUsersByName = function (term) {
            if(term.length > 0){
                UsersFactory.search(term,
                    function (data) {
                        $scope.foundUsers = data;
                        $scope.noResults = false;
                        if(data.length == 0)
                            $scope.noResults = true;
                    },
                    function (serverError) {
                        $scope.noResults = true;
                    });
            }
        };

        $scope.showResults = function () {
            $scope.menuOpened = true;
        }

        $scope.hideResults = function (username) {
            $location.path("/users/" + username);
            $scope.search = "";
        }

        $scope.sendFriendRequest = function (user) {
            if(!username) username = user;
            ProfileFactory.sendFriendRequest(username, function () {
                $.notify('You have successfully sent friend request to ' + username + '.', 'success');
                UtilsFactory.refresh();
            }, function (serverError) {
                $.notify(serverError.message, 'error');
            });
        };

        $scope.getMyFriendsPreview = function () {
            UsersFactory.getMyFriends(
                function (data) {
                    $scope.friendsPreview = data;
                },
                function (serverError) {

                });
        };

        $scope.getFriendsPreview = function () {
            UsersFactory.getUserFriendsPreview($routeParams.username,
                function (data) {
                    $scope.friendsPreview = data;
                },
                function (serverError) {

                });
        };

        $scope.getFriendsList = function() {
            if($routeParams.username === localStorage['username']){
                UsersFactory.getOwnFriendsList(
                    function (data) {
                        $scope.friends = data;
                    },
                    function (serverError) {

                    });
            } else{
                UsersFactory.getFriendsList(
                    function (data) {
                        $scope.friends = data;
                    },
                    function (serverError) {

                    });
            }
        }
    });
})();
