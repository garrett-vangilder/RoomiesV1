"use strict";

app.controller("TopCtrl", function($scope, $location, $window, AuthFactory) {
  $scope.isLoggedIn = false;
  let currentUser = null;
  let currentHouseid = null
  $scope.currentHouseid = null

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user.uid;
      $scope.isLoggedIn = true;
      AuthFactory.getUsersHomeId(currentUser).then( function(filteredHome) {
        currentHouseid = filteredHome
        $scope.currentHouseid = filteredHome
      })
    } else {
      currentUser = null;
      $scope.isLoggedIn = false;
      $window.location.href = "#/login";
    }
    $scope.$apply();
  })

  $scope.getUser = function() {
    return currentUser
  };

  $scope.getHouseid = function() {
    return currentHouseid
  }

  $scope.logout = function() {
    AuthFactory.logoutUser()
    .then(function(data) {
      $window.location.href="/"
    })
  }
})
