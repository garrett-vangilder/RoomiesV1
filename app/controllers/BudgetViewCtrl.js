app.controller("BudgetViewCtrl", function($scope, $window, $routeParams, BudgetFactory, HomeFactory, AuthFactory) {
    let _homeid = $routeParams.homeid;
    $scope.isLoaded=false;

    $scope.newBudgetItem = {
        "categoryName": "",
        "amount": 0,
        "houseId": _homeid,
        "currentAmountSpent": 0
    };

    $scope.selectedBudgetItem = {
        "categoryName": "",
        "amount": "",
        "id": ""
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
        BudgetFactory.newBudgetItem($scope.newBudgetItem)
            .then(function() {
                $scope.getBudgetList();
                $scope.addingBudgetItem = false;
            })
    }

    $scope.deleteBudgetItem = function(itemId) {
        BudgetFactory.deleteBudgetItem(itemId).then(function() {
            $scope.getBudgetList();
        })
    }

    $scope.editBudgetItem = function(itemId) {
        BudgetFactory.getSingleBudgetItem(itemId).then(function(budgetObj) {
            budgetObj.categoryName = $scope.selectedBudgetItem.categoryName;
            budgetObj.amount = parseInt($scope.selectedBudgetItem.amount);
            BudgetFactory.updateBudgetItem(itemId, budgetObj).then(function(newObj) {
                $scope.getBudgetList();
                $scope.isEdit = false;
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
            $scope.newExpenseItem.categoryName = budgetName;
            BudgetFactory.newExpenseItem($scope.newExpenseItem).then(function() {
                BudgetFactory.getSingleBudgetItem($scope.newExpenseItem.categoryId).then(function(budgetObj) {
                    budgetObj.currentAmountSpent = parseInt(budgetObj.currentAmountSpent) + parseInt($scope.newExpenseItem.amount)
                    BudgetFactory.updateBudgetItem($scope.newExpenseItem.categoryId, budgetObj).then(function(newObj) {
                        $scope.getBudgetList();
                        $scope.getExpenseList();
                        $scope.addingExpense = false;
                    })
                })
            });
        });
    };

    $scope.deleteExpenseItem = function(itemId) {
        BudgetFactory.getSingleExpenseItem(itemId).then(function(expenseObj) {
            BudgetFactory.getSingleBudgetItem(expenseObj.categoryId).then(function(budgetObj) {
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

    $scope.editExpenseItem = function(itemId) {
      BudgetFactory.getSingleExpenseItem(itemId).then(function(expenseObj) {
        BudgetFactory.getSingleBudgetItem(expenseObj.categoryId).then(function(budgetObj) {
          budgetObj.currentAmountSpent = parseInt(budgetObj.currentAmountSpent) - parseInt(expenseObj.amount)
          BudgetFactory.updateBudgetItem(expenseObj.categoryId, budgetObj).then(function(updateBudgetObj) {
            expenseObj.paidTo =  $scope.selectedExpenseItem.paidTo
            expenseObj.amount =  parseInt($scope.selectedExpenseItem.amount)
            BudgetFactory.updateExpenseItem(itemId, expenseObj).then(function(newExpenseItem) {
              BudgetFactory.getSingleBudgetItem(newExpenseItem.categoryId).then(function(secondBudgetItem) {
                secondBudgetItem.currentAmountSpent = parseInt(secondBudgetItem.currentAmountSpent) + parseInt($scope.selectedExpenseItem.amount)
                BudgetFactory.updateBudgetItem(newExpenseItem.categoryId, secondBudgetItem).then(function(updateBudgetItem2) {
                  $scope.getBudgetList();
                  $scope.getExpenseList();
                  $scope.isEditExpense = false;
                })
              })
            })
          })
        })
      })
    }

    $scope.editMode = function(id) {
      $scope.isEdit = true;
      BudgetFactory.getSingleBudgetItem(id).then(function(obj) {
        $scope.selectedBudgetItem.categoryName = obj.categoryName;
        $scope.selectedBudgetItem.amount = obj.amount;
        $scope.selectedBudgetItem.id = id;
      });
    }

    $scope.editExpenseMode = function(id) {
      $scope.isEditExpense = true;
      BudgetFactory.getSingleExpenseItem(id).then(function(obj) {
        $scope.selectedExpenseItem.paidTo = obj.paidTo
        $scope.selectedExpenseItem.categoryId = obj.categoryId
        $scope.selectedExpenseItem.categoryName = obj.categoryName
        $scope.selectedExpenseItem.notes = obj.notes
        $scope.selectedExpenseItem.paidDate = obj.paidDate
        $scope.selectedExpenseItem.amount = obj.amount
        $scope.selectedExpenseItem.id = id
      });
    };



    $scope.getExpenseList = function() {
        BudgetFactory.getExpenseList(_homeid).then(function(filteredExpenseArray) {
            $scope.expenseItems = filteredExpenseArray;
            $scope.isLoaded=true
            $scope.stopSpin();
        });
    };



});
