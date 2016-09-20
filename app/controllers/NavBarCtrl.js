app.controller("NavBarCtrl", function($scope, $location,  $window, $routeParams, AuthFactory) {
  $scope.homeId = '';
  let homeIdParams = $routeParams.homeid;
  let uid = $scope.getUser();


  firebase.auth().onAuthStateChanged(function(user) {
    console.log('creating navbar')
    if (user) {
      console.log("user", user);
      AuthFactory.getSingleUserForLogin(user.uid).then(function(obj) {
        console.log(obj[0].homeid)
        $scope.homeId = obj[0].homeid;
        console.log('homeId', $scope.homeId)
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
