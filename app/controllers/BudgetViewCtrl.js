app.controller("BudgetViewCtrl", function($scope, $window, $routeParams, BudgetFactory, HomeFactory, AuthFactory) {
    let _homeid = $routeParams.homeid;

    $scope.newBudgetItem = {
        "categoryName": "",
        "amount": null,
        "houseId": _homeid,
        "currentAmountSpent": 0
    };

    $scope.addBudgetItem = function() {
        console.log('sending over new budget item to FB')
        BudgetFactory.newBudgetItem($scope.newBudgetItem)
            .then(function() {
                $scope.getBudgetList();
            })
    }

    $scope.getBudgetList = function() {
      BudgetFactory.getBudgetList(_homeid).then( function(filteredBudgetArray) {
        $scope.budgetItems = filteredBudgetArray;
      })
    }

});
