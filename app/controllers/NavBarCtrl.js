app.controller("NavBarCtrl", function($scope, $location,  $window, $routeParams, AuthFactory) {
  $scope.homeId = $routeParams.homeid;
  let homeIdParams = $routeParams.homeid;
  let uid = $scope.getUser();


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      AuthFactory.getSingleUserForLogin(user.uid).then(function(obj) {
        console.log('obj from when nav is being made', obj);
        $scope.homeId = obj[0].homeid;
      })
      $scope.navItems = [{
        url: "#/registeruser",
        name: "Register",
        showState: "!$parent.isLoggedIn"
      },
      // {
      //   url: `#/home-tools/${$scope.homeId}`,
      //   name: "Home Tools",
      //   showState: "$parent.isLoggedIn"
      // },
       {
        url: `#/messages/${user.uid}`,
        name: "Messages",
        showState: "$parent.isLoggedIn"
      }]
    } else {
        $scope.navItems = [];
    }
  })



      $scope.isActive = (viewLocation) => viewLocation === $location.path();
});
