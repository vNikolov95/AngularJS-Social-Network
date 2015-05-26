/**
 * Created by Valentin Nikolov on 26.5.2015 ã..
 */
(function() {
    "use strict"

    var app = angular.module("app.controllers");

    app.controller("UsersController", function($scope, ProfileFactory, UsersFactory, UtilsFactory) {
        $scope.changePasswordModel = {
            oldPassword: "",
            password: "",
            repeatPassword: ""
        };

        ProfileFactory.get(function (data) {
            $scope.userProfileModel = {
                profileImageData: data.profileImageData,
                coverImageData: data.coverImageData,
                name: data.name,
                email: data.email,
                gender: data.gender
            };
        }, function (data) {
            console.log(data);
        });

        $scope.changePassword = function ($event) {
            ProfileFactory.changePassword($scope.changePasswordModel.oldPassword,
                $scope.changePasswordModel.password,
                $scope.changePasswordModel.repeatPassword,
                function () {
                    UtilsFactory.refresh();
                    $.notify('You have successfully changed your password', 'success');
                }, function () {
                    $.notify('An error occurred trying to change password', 'error');
                });
        };

        $scope.editProfile = function($event) {
            ProfileFactory.update($scope.userProfileModel, function (data) {
                UtilsFactory.refresh();
                $.notify('You have successfully edited your profile.', 'success');
            }, function (data) {
                console.log(data);
            });
        };

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
                    // TODO: Display type-mismatch error message
                }
            });
        }

        $scope.uploadProfilePicture = function () {
            handleFileSelect("picture", "profilePicturePreview");
        };

        $scope.uploadCoverPicture = function () {
            handleFileSelect("cover-picture", "coverPicturePreview");
        };
    });
})();
