app.controller("NavBarCtrl", function($scope, $location, $routeParams) {
    $scope.navItems = [{
      url: "#/register",
      name: "Register",
      showState: "!$parent.isLoggedIn"
    }, {
      url: "#/home-tools/" + $routeParams.houseId,
      name: "Home Tools",
      showState: "$parent.isLoggedIn"
    }]
      $scope.isActive = (viewLocation) => viewLocation === $location.path();
});
