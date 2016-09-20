app.controller("NavBarCtrl", function($scope, $location,  $window, $routeParams, AuthFactory) {
  let homeId = $scope.getHouseid();
  let homeIdParams = $routeParams.homeid;
  let uid = $scope.getUser();


  firebase.auth().onAuthStateChanged(function(user) {
    console.log('creating navbar')
    if (user) {
      $scope.navItems = [{
        url: "#/registeruser",
        name: "Register",
        showState: "!$parent.isLoggedIn"
      }, {
        url: `#/home-tools/${$routeParams.homeid}`,
        name: "Home Tools",
        showState: "$parent.isLoggedIn"
      }, {
        url: `#/messages/${AuthFactory.getUid()}`,
        name: "Messages",
        showState: "$parent.isLoggedIn"
      }]
    } else {
        $scope.navItems = [];
    }
  })

    // $scope.navItems = [{
    //   url: "#/registeruser",
    //   name: "Register",
    //   showState: "!$parent.isLoggedIn"
    // }, {
    //   url: `#/home-tools/${$routeParams.homeid}`,
    //   name: "Home Tools",
    //   showState: "$parent.isLoggedIn"
    // }, {
    //   url: `#/messages/${AuthFactory.getUid()}`,
    //   name: "Messages",
    //   showState: "$parent.isLoggedIn"
    // }]

      $scope.isActive = (viewLocation) => viewLocation === $location.path();
});
