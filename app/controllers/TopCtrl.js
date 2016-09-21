"use strict";

app.controller("TopCtrl", function($scope, $location, $window, AuthFactory, usSpinnerService) {
  $scope.isLoggedIn = false;
  let currentUser = null;
  let currentHouseid = null
  $scope.currentHouseid = null

  $scope.startSpin = function() {
      usSpinnerService.spin('spinner-1');
  }
  $scope.stopSpin = function() {
      usSpinnerService.stop('spinner-1');
  }

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
