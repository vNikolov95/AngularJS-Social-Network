(function() {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("ProfileController", function($scope, $rootScope, UsersFactory, UtilsFactory, ProfileFactory) {
        $scope.newUserModel = {
            name: "",
            email: "",
            username: "",
            password: "",
            gender: "",
            confirmPassword: ""
        };

        $scope.changePasswordModel = {
            oldPassword: "",
            password: "",
            repeatPassword: ""
        };

        $scope.userProfileModel = {};

        $scope.getData = function () {
            if (UtilsFactory.isLogged()) {
                ProfileFactory.get(function (data) {
                    $scope.userProfileModel = data;
                }, function (data) {
                    $.notify(data.message, 'error');
                });
            }
        }

        $scope.logout = function () {
            UsersFactory.logout(function () {
                UtilsFactory.clearCredentials();
                UtilsFactory.refresh();
                $.notify('You have successfully logged out.', 'success');
            }, function () {
                $.notify('Error logging out.', 'error');
            });
        };

        $scope.login = function ($event) {
            if (!$scope.newUserModel.username || !$scope.newUserModel.password)
                return;

            UsersFactory.login($scope.newUserModel.username, $scope.newUserModel.password,
                function (data) {
                    UtilsFactory.setCredentials(data);
                    UtilsFactory.refresh();

                    $.notify('You have successfully logged in.', 'success');
                }, function () {
                    $.notify('The username or password is incorrect.', 'error');
                });
        };

        $scope.register = function () {
            if (!$scope.newUserModel.username
                || !$scope.newUserModel.password
                || !$scope.newUserModel.email
                || !$scope.newUserModel.fullName
                || !$scope.newUserModel.gender)
                return;
            if($scope.newUserModel.password != $scope.newUserModel.confirmPassword){
                $.notify('Passwords do no match.', 'error');
                return;
            }

            UsersFactory.register(userProfileModel, function (data) {
                UtilsFactory.setCredentials(data);
                UtilsFactory.refresh();
                $.notify('You have successfully registered and logged in.', 'success');
            }, function () {
                $.notify('Registration data is incorrect.', 'error');
            });
        };

        $scope.changePassword = function ($event) {
            if(!$scope.changePasswordModel.oldPassword
                || !$scope.changePasswordModel.password
                || !$scope.changePasswordModel.repeatPassword)
                return;

            ProfileFactory.changePassword($scope.changePasswordModel, function (data) {
                    UtilsFactory.refresh();
                    $.notify(data.message, 'success');
                }, function (data) {
                    $.notify(data.message, 'error');
                });
        };

        $scope.editProfile = function($event) {
            ProfileFactory.update($scope.userProfileModel, function (data) {
                UtilsFactory.refresh();
                $.notify(data.message, 'success');
            }, function (data) {
                $.notify(data.message, 'error');
            });
        };

        $scope.uploadProfilePicture = function () {
            handleFileSelect("picture", "profilePicturePreview");
        };

        $scope.uploadCoverPicture = function () {
            handleFileSelect("cover-picture", "coverPicturePreview");
        };

        $scope.displayHoverBox = function(friend, $event){
            UsersFactory.preview(friend,
                function (data) {
                    $scope.userPreviewData = data;
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                });
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

        $scope.getMyFriendRequests = function () {
            ProfileFactory.getFriendRequests(
                function (serverData) {
                    $scope.myRequests = serverData;
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                });
        };

        $scope.approveFriendRequest = function (request) {
            ProfileFactory.acceptFriendRequest(request.id,
                function () {
                    var index =  $scope.myRequests.indexOf(request);
                    $scope.myRequests.splice(index,1);
                    $.notify('Friend request approved!', 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                });
        };

        $scope.rejectFriendRequest = function (request) {
            ProfileFactory.rejectFriendRequest(request.id,
                function () {
                    var index =  $scope.myRequests.indexOf(request);
                    $scope.myRequests.splice(index,1);
                    $.notify('Friend request rejected!', 'success');
                },
                function (serverError) {
                    $.notify(serverError.message, 'error');
                });
        };

        // Helper functions
        function handleFileSelect(inputSelector, picturePreview) {
            $('body').on('change', "#" + inputSelector, function () {
                var fileInput = document.getElementById(inputSelector);
                var file = fileInput.files[0],
                    reader;

                if (file.type.match(/image\/.*/)) {
                    reader = new FileReader();
                    reader.onload = function (readerEvt) {
                        var binaryString = readerEvt.target.result;
                        var ds = document.getElementById(picturePreview);
                        ds.src = reader.result;
                        if (inputSelector === "picture") {
                            $scope.userProfileModel.profileImageData = ds.src;
                        }
                        else {
                            $scope.userProfileModel.coverImageData = ds.src;
                        }
                    };

                    reader.readAsDataURL(file);
                } else {
                    $.notify("Invalid image format", "error");
                }
            });
        }
    });
})();
