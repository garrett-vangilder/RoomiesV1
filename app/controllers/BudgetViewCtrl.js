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
      "notes": "",
      "categoryId": "",
      "categoryName": ""
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

    $scope.addExpenseItem = function() {
      BudgetFactory.getSingleBudgetName($scope.newExpenseItem.categoryId).then(function(budgetName) {
        console.log("the budget name should come through", budgetName);
        $scope.newExpenseItem.categoryName = budgetName;
        BudgetFactory.newExpenseItem($scope.newExpenseItem).then(function() {
          BudgetFactory.getSingleBudgetItem($scope.newExpenseItem.categoryId).then(function(budgetObj) {
            budgetObj.currentAmountSpent = budgetObj.currentAmountSpent + $scope.newExpenseItem.amount
            BudgetFactory.updateBudgetItem($scope.newExpenseItem.categoryId, budgetObj).then(function(newObj) {
              $scope.getBudgetList();
              $scope.getExpenseList();    
            })
          })
        });
      });
    };

    $scope.getExpenseList = function() {
      BudgetFactory.getExpenseList(_homeid).then( function(filteredExpenseArray) {
        $scope.expenseItems = filteredExpenseArray;
      });
    };


});
