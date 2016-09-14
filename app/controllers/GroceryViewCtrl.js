app.controller("GroceryViewCtrl", function($scope, $window, GroceryFactory, HomeFactory, AuthFactory) {

  let _homeid = HomeFactory.getHouseid();
  let _uid = AuthFactory.getUid();
  let filteredGroceryArray = [];

  $scope.newGroceryItem = {
    "name": "",
    "uid": _uid,
    "houseId": _homeid,
    "purchased": false,
    "spoiled": false
  };

  $scope.addGroceryItem = function() {
    GroceryFactory.newGroceryItem($scope.newGroceryItem)
    .then(function() {
      $window.location.href = `#/grocerylist/${HomeFactory.getHouseid()}`
    });
  };

  $scope.getGroceryList = function() {
    GroceryFactory.getGroceryList(_homeid).then( function(filteredGroceryArray) {
      console.log("GVC filteredGroceryArray", filteredGroceryArray);
      $scope.groceryList = filteredGroceryArray;
      console.log()
    });
  }

  //   $scope.groceryList = [{
  //       name: "Pancakes",
  //       purchased: 'false',
  //       spoiled: false
  //   }, {
  //     name: "Apples",
  //     purchased: 'false',
  //     spoiled: false
  //   },
  //   {
  //     name: "Bananas",
  //     purchased: 'true',
  //     spoiled: false
  //   },
  // ];

});
