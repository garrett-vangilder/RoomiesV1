app.controller("BudgetViewCtrl", function($scope, $window, $routeParams, BudgetFactory, HomeFactory, AuthFactory) {
    let _homeid = $routeParams.homeid;

    $scope.newBudgetItem = {
        "categoryName": "",
        "amount": 0,
        "houseId": _homeid,
        "currentAmountSpent": 0
    };

    $scope.selectedBudgetItem = {
        "categoryName": "",
        "amount": ""
    };

    $scope.newExpenseItem = {
        "paidTo": "",
        "amount": 0,
        "notes": "",
        "categoryId": "",
        "categoryName": "",
        "houseId": _homeid
    };

    $scope.selectedExpenseItem = {
        "paidTo": "",
        "amount": 0,
        "categoryName": "",
        "categoryId": "",
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
        BudgetFactory.getSingleBudgetItem(itemId).then(function(budgetObj) {
            console.log('budgetObj', budgetObj);
            budgetObj.categoryName = $scope.selectedBudgetItem.categoryName;
            budgetObj.amount = parseInt($scope.selectedBudgetItem.amount);
            BudgetFactory.updateBudgetItem(itemId, budgetObj).then(function(newObj) {
                console.log('should be new item', newObj)
                $scope.getBudgetList();
            })
        })
    }

    $scope.getBudgetList = function() {
        BudgetFactory.getBudgetList(_homeid).then(function(filteredBudgetArray) {
            $scope.budgetItems = filteredBudgetArray;
        })
    }

    $scope.addExpenseItem = function() {
        BudgetFactory.getSingleBudgetName($scope.newExpenseItem.categoryId).then(function(budgetName) {
            console.log("the budget name should come through", budgetName);
            $scope.newExpenseItem.categoryName = budgetName;
            BudgetFactory.newExpenseItem($scope.newExpenseItem).then(function() {
                BudgetFactory.getSingleBudgetItem($scope.newExpenseItem.categoryId).then(function(budgetObj) {
                    budgetObj.currentAmountSpent = parseInt(budgetObj.currentAmountSpent) + parseInt($scope.newExpenseItem.amount)
                    BudgetFactory.updateBudgetItem($scope.newExpenseItem.categoryId, budgetObj).then(function(newObj) {
                        $scope.getBudgetList();
                        $scope.getExpenseList();
                    })
                })
            });
        });
    };

    $scope.deleteExpenseItem = function(itemId) {
        BudgetFactory.getSingleExpenseItem(itemId).then(function(expenseObj) {
            console.log("the expense obj ready for edit", expenseObj)
            BudgetFactory.getSingleBudgetItem(expenseObj.categoryId).then(function(budgetObj) {
                console.log('budget obj returned after a delete', budgetObj)
                budgetObj.currentAmountSpent = parseInt(budgetObj.currentAmountSpent) - parseInt(expenseObj.amount);
                BudgetFactory.updateBudgetItem(expenseObj.categoryId, budgetObj).then(function() {
                    BudgetFactory.deleteExpenseItem(itemId).then(function() {
                        $scope.getBudgetList();
                        $scope.getExpenseList();
                    })
                })
            });
        });
    };

    // $scope.editExpenseItem = function(itemId) {
    //   BudgetFactory.getSingleExpenseItem(itemId).then(function(expenseObj) {
    //     console.log("the expense obj ready for edit", expenseObj)
    //     expenseObj.paidTo =  $scope.selectedExpenseItem.paidTo
    //     expenseObj.amount =  $scope.selectedExpenseItem.amount
    //     expenseObj.categoryName =  $scope.selectedExpenseItem.categoryName
    //     expenseObj.categoryId =  $scope.selectedExpenseItem.categoryId
    //     BudgetFactory.updateExpenseItem(itemId, expenseObj).then(function(newObj) {
    //       BudgetFactory.getSingleBudgetItem($scope.selectedExpenseItem.categoryId).then(function(budgetObj) {
    //         console.log('budget obj returned after an edit', budgetObj)
    //         budgetObj.currentAmountSpent = budgetObj.currentAmountSpent - expenseObj.amount;
    //         BudgetFactory.updateBudgetItem(expenseObj.categoryId, budgetObj).then(function() {
    //           $scope.getBudgetList();
    //           $scope.getExpenseList();
    //         });
    //       })
    //     });
    //   });
    // };

    $scope.editExpenseItem = function(itemId) {
      BudgetFactory.getSingleExpenseItem(itemId).then(function(expenseObj) {
        console.log("single item returned", expenseObj)
        BudgetFactory.getSingleBudgetItem(expenseObj.categoryId).then(function(budgetObj) {
          console.log('GETTING SINGLE BUDGET CATEGORY', budgetObj);
          console.log("CATEGORY SPENT BEFORE EDIT",budgetObj.currentAmountSpent )
          budgetObj.currentAmountSpent = parseInt(budgetObj.currentAmountSpent) - parseInt(expenseObj.amount)
          console.log("CATEGORY SPENT AFTER EDIT",budgetObj.currentAmountSpent )
          BudgetFactory.updateBudgetItem(expenseObj.categoryId, budgetObj).then(function(updateBudgetObj) {
            console.log('new budgetObj', updateBudgetObj)
            expenseObj.paidTo =  $scope.selectedExpenseItem.paidTo
            expenseObj.amount =  parseInt($scope.selectedExpenseItem.amount)
            BudgetFactory.updateExpenseItem(itemId, expenseObj).then(function(newExpenseItem) {
              console.log('newExpenseItem', newExpenseItem)
              BudgetFactory.getSingleBudgetItem(newExpenseItem.categoryId).then(function(secondBudgetItem) {
                console.log("Second potential Budget Item", secondBudgetItem)
                secondBudgetItem.currentAmountSpent = parseInt(secondBudgetItem.currentAmountSpent) + parseInt($scope.selectedExpenseItem.amount)
                BudgetFactory.updateBudgetItem(newExpenseItem.categoryId, secondBudgetItem).then(function(updateBudgetItem2) {
                  console.log('final budget item', updateBudgetItem2)
                  $scope.getBudgetList();
                  $scope.getExpenseList();
                })
              })
            })
          })
        })
      })
    }



    $scope.getExpenseList = function() {
        BudgetFactory.getExpenseList(_homeid).then(function(filteredExpenseArray) {
            $scope.expenseItems = filteredExpenseArray;
        });
    };


});
