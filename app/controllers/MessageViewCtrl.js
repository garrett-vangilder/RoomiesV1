app.controller("MessageViewCtrl", function($scope, $window, $routeParams, MessageFactory, HomeFactory, AuthFactory) {
  let _uid = $routeParams.userid;
  let _houseid = AuthFactory.getUsersHomeId(_uid)
  let _firstName = AuthFactory.getUsersFirstName(_uid);


  $scope.newMessage = {
    "contents": "",
    "authorName": AuthFactory.getUsersFirstName(_uid),
    "houseId": "",
    "uid": _uid
  };

  $scope.postNewMessage = function() {
    AuthFactory.getUsersHomeId($routeParams.userid).then(function(filteredHome) {
      console.log("filteredHome", filteredHome);
      $scope.newMessage.houseId = filteredHome;
      MessageFactory.submitMessage($scope.newMessage).then(function() {
    }).then(function(filteredHome) {
    })
      // $scope.getUserMessages();

    });
  };

  $scope.getUserMessages = function() {
    // MessageFactory.getMessageList(_houseid).then( function(messageList) {
    //   $scope.messageList = messageList;
    // });
  };

  $scope.name = function() {
    console.log(_uid);
    console.log(_houseid);
    console.log(_firstName);
    // console.log(_houseid);
    // AuthFactory.getUsersFirstName(_uid);
  }

});
