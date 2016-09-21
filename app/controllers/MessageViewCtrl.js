app.controller("MessageViewCtrl", function($scope, $window, $routeParams, MessageFactory, HomeFactory, AuthFactory) {
            let _uid = $routeParams.userid;
            $scope.userIdx = _uid;
            let _houseid = "";
            let messageList = [];


            $scope.newMessage = {
                "contents": "",
                "authorName": "",
                "houseId": "",
                "uid": _uid,
                "postDate": new Date()
            };

            $scope.postNewMessage = function() {
                AuthFactory.getUsersHomeId($routeParams.userid).then(function(filteredHome) {
                    $scope.newMessage.houseId = filteredHome;
                    AuthFactory.getUsersFirstName($routeParams.userid).then(function(filteredName) {
                        $scope.newMessage.authorName = filteredName;
                    }).then(function() {
                        MessageFactory.submitMessage($scope.newMessage).then(function() {
                            $scope.getUserMessages()
                            $scope.newMessage = {
                                "contents": "",
                                "authorName": "",
                                "houseId": "",
                                "uid": _uid,
                                "postDate": new Date()
                            };
                        });
                    });
                });
            };


            $scope.getUserMessages = function() {
                AuthFactory.getUsersHomeId($routeParams.userid).then(function(filteredHome) {
                        MessageFactory.getList(filteredHome).then(function(messageList) {
                            $scope.messages = messageList;
                        });
                    });
                  }




                    $scope.name = function() {
                        console.log(_uid);
                        console.log(_houseid);
                        console.log(_firstName);
                    }

                });
