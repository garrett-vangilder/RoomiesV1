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
      console.log("Current user logged in", user.uid)
      AuthFactory.getUsersHomeId(currentUser).then( function(filteredHome) {
        currentHouseid = filteredHome
        $scope.currentHouseid = filteredHome
        console.log("currentHouseid is ", currentHouseid)
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
      console.log("logged out", data);
    })
  }
})
