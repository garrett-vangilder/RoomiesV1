app.controller("GroceryViewCtrl", function($scope, $window, GroceryFactory, $routeParams, HomeFactory, AuthFactory) {

    let _homeid = $routeParams.homeid;
    let _uid = AuthFactory.getUid();
    let filteredGroceryArray = [];
    let ownedGroceryList = []
    let groceryObj = {};
    let itemId = "";

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
            console.log("purchasedlist", $scope.purchasedList)
            $scope.groceryList = GroceryFactory.filtergroceryList(filteredGroceryArray, 'purchased', false);
        });
    };

    $scope.deleteItem = function(itemId) {
      GroceryFactory.deleteGroceryItem(itemId).then( function(groceryObj) {
        console.log(groceryObj);
        $scope.getGroceryList();

      })
    };

    $scope.buyGroceryItem = function(itemId) {
        console.log(itemId);
        GroceryFactory.getSingleGroceryItem(itemId).then(function(groceryObj) {
            console.log(groceryObj);
            groceryObj.purchased = true;
            GroceryFactory.patchGroceryItem(itemId, groceryObj).then(function() {
                $scope.getGroceryList();
            });
        });
    };





});
