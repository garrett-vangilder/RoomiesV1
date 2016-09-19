app.controller("BudgetViewCtrl", function($scope, $window, $routeParams, BudgetFactory, HomeFactory, AuthFactory) {
    let _homeid = $routeParams.homeid;

    $scope.newBudgetItem = {
        "categoryName": "",
        "amount": null,
        "houseId": _homeid,
        "currentAmountSpent": 0
    };

    $scope.selectedBudgetItem = {
      "categoryName": "",
      "amount": ""
    };

    $scope.newExpenseItem = {
      "paidTo": "",
      "amount": null,
      "dateDue": "",
      "category": "",
      "notes": ""
    };

    $scope.selectedExpenseItem = {
      "paidTo": "",
      "amount": null,
      "dateDue": "",
      "category": "",
      "notes": ""
    };

    $scope.addBudgetItem = function() {
        console.log('sending over new budget item to FB')
        BudgetFactory.newBudgetItem($scope.newBudgetItem)
            .then(function() {
                $scope.getBudgetList();
            })
    }

    $scope.deleteBudgetItem = function(itemId) {
      console.log('deleting an item from the budget category list')
      BudgetFactory.deleteBudgetItem(itemId).then(function() {
        $scope.getBudgetList();
      })
    }
    $scope.editBudgetItem = function(itemId) {
      $scope.isEdit = false;
      BudgetFactory.getSingleBudgetItem(itemId).then(function(budgetObj) {
        console.log('budgetObj', budgetObj);
        budgetObj.categoryName = $scope.selectedBudgetItem.categoryName;
        budgetObj.amount = $scope.selectedBudgetItem.amount;
        BudgetFactory.updateBudgetItem(itemId,budgetObj).then(function(newObj) {
          console.log('should be new item', newObj)
          $scope.getBudgetList();
        })
      })
    }


    $scope.getBudgetList = function() {
      BudgetFactory.getBudgetList(_homeid).then( function(filteredBudgetArray) {
        $scope.budgetItems = filteredBudgetArray;
      })
    }


});
