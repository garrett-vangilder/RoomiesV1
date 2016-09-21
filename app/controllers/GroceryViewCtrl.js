app.controller("GroceryViewCtrl", function($scope, $window, GroceryFactory, $routeParams, HomeFactory, AuthFactory) {

    let _homeid = $routeParams.homeid;
    let _uid = AuthFactory.getUid();
    let filteredGroceryArray = [];
    let ownedGroceryList = []
    let groceryObj = {};
    let itemId = "";
    $scope.isLoaded = false;

    $scope.newGroceryItem = {
        "name": "",
        "uid": _uid,
        "houseId": _homeid,
        "purchased": false,
        "spoiled": false
    };

    $scope.selectedGroceryItem = {
        "name": "",
        "uid": '',
        "houseId": '',
        "purchased": '',
        "spoiled": ''
    }

    $scope.addGroceryItem = function() {
        GroceryFactory.newGroceryItem($scope.newGroceryItem)
            .then(function() {
                $scope.getGroceryList();
                $scope.newGroceryItem.name = "";
                $scope.addGrocery= false;
            });
    };

    $scope.getGroceryList = function() {
        GroceryFactory.getGroceryList(_homeid).then(function(filteredGroceryArray) {
            $scope.purchasedList =   GroceryFactory.filtergroceryList(filteredGroceryArray, 'purchased', true);
            $scope.groceryList = GroceryFactory.filtergroceryList(filteredGroceryArray, 'purchased', false);
            $scope.stopSpin();
            $scope.isLoaded = true;
        });
    };

    $scope.deleteItem = function(itemId) {
      GroceryFactory.deleteGroceryItem(itemId).then( function(groceryObj) {
        $scope.getGroceryList();

      })
    };

    $scope.buyGroceryItem = function(itemId) {
        GroceryFactory.getSingleGroceryItem(itemId).then(function(groceryObj) {
            groceryObj.purchased = true;
            GroceryFactory.patchGroceryItem(itemId, groceryObj).then(function() {
                $scope.getGroceryList();
            });
        });
    };

    $scope.spoiledItem = function(itemId) {
      GroceryFactory.getSingleGroceryItem(itemId).then(function(groceryObj) {
        groceryObj.spoiled = true;
        GroceryFactory.patchGroceryItem(itemId, groceryObj).then(function() {
            $scope.getGroceryList();
        });
      })
    }





});
