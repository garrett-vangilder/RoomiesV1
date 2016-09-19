app.controller("MessageViewCtrl", function($scope, $window, $routeParams, MessageFactory, HomeFactory, AuthFactory) {
            let _uid = $routeParams.userid;
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
                    console.log("filteredHome", filteredHome);
                    $scope.newMessage.houseId = filteredHome;
                    AuthFactory.getUsersFirstName($routeParams.userid).then(function(filteredName) {
                        $scope.newMessage.authorName = filteredName;
                    }).then(function() {
                        MessageFactory.submitMessage($scope.newMessage).then(function() {
                            console.log('just posted your message');
                            console.log('What is filtered home?', filteredHome)
                            $scope.getUserMessages()
                        });
                    });
                });
            };

            // $scope.getChoresList = function() {
            //   ChoresFactory.getChoresList(_homeid).then( function(filteredChoresArray) {
            //     $scope.chores = filteredChoresArray;
            //   });
            // };

            $scope.getUserMessages = function() {
                AuthFactory.getUsersHomeId($routeParams.userid).then(function(filteredHome) {
                        console.log("filteredHome", filteredHome);
                        MessageFactory.getList(filteredHome).then(function(messageList) {
                            $scope.messages = messageList;
                        });
                    });
                  }




                    $scope.name = function() {
                        console.log(_uid);
                        console.log(_houseid);
                        console.log(_firstName);
                        // console.log(_houseid);
                        // AuthFactory.getUsersFirstName(_uid);
                    }

                });
