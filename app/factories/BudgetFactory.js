"use strict"

app.factory("BudgetFactory", function($q, $http, FBCreds, FirebaseURL) {

    let newBudgetItem = (budgetObj) => {
      return $q((resolve, reject) => {
        $http.post(`${FirebaseURL}/budget.json`, budgetObj).then( (budgetID) => {
          resolve(budgetID);
        }), (error) => {
          console.error(error)
          reject(error);
        }
      });
    };


    let deleteBudgetItem = (itemId) => {
      return $q( (resolve, reject) => {
        $http.delete(`${FirebaseURL}/budget/${itemId}.json`)
        .success( (budgetObj) => {
          resolve(budgetObj);
        });
      });

    };

    let updateBudgetItem = (itemId, budgetObj) => {
      return $q( (resolve, reject) => {
        $http.patch(`${FirebaseURL}/budget/${itemId}.json`, JSON.stringify(budgetObj))
        .success( (ObjectFromFirebase) => {
          resolve(ObjectFromFirebase);
        })
        .error( (error) => {
          reject(error);
        });
      });
    };

    let getBudgetList = (houseId) => {
      let budgetList = [];
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/budget.json?orderBy="houseId"&equalTo="${houseId}"`)
        .success( (budgetObj) => {
          console.log("this is the budgetObj", budgetObj)
          Object.keys(budgetObj).forEach( (key) => {
            budgetObj[key].id = key;
            budgetList.push(budgetObj[key]);
          })
          resolve(budgetList);
        })
        .error( (error) => {
          reject(error);
        })
      })
    }

    let getSingleBudgetItem = (itemId) => {
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/budget/${itemId}.json`)
        .success( (budgetObj) => {
          resolve(budgetObj)
        })
        .error( (error) => {
          reject(error);
        })
      })
    }

    let getSingleBudgetName = (itemId) => {
      let budgetName = ""
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/budget/${itemId}.json`)
        .success( (budgetObj) => {
          budgetName = budgetObj.categoryName
          resolve(budgetName);
        })
        .error( (error) => {
          reject(error);
        });
      });
    };

    let clearExpenseMonthly = (houseId) => {

    }

    let newExpenseItem = (expenseObj) => {
      return $q( (resolve, reject) => {
        $http.post(`${FirebaseURL}/expense.json`, expenseObj).then( (expenseID) => {
          resolve(expenseID);
        }), (error) => {
          console.error(error)
          reject(error)
        }
      })
    };

    let updateExpenseItem = (itemId) => {

    }

    let getExpenseList = (houseId) => {
      let expenseList = [];
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/expense.json?orderBy="houseId"&equalTo="${houseId}"`)
        .success( (expenseObj) => {
          console.log("this is the expenseObj", expenseObj)
          Object.keys(expenseObj).forEach( (key) => {
            expenseObj[key].id = key;
            expenseList.push(expenseObj[key]);
          })
          resolve(expenseList)
        })
        .error( (error) => {
          reject(error);
        })
      })
    }


    let getSingleExpenseItem = (itemId) => {
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/expense/${itemId}.json`)
        .success( (expenseObj) => {
          resolve(expenseObj)
        })
        .error( (error) => {
          reject(error);
        });
      });
    };

    let deleteExpenseItem = (itemId) => {
      return $q( (resolve, reject) => {
        $http.delete(`${FirebaseURL}/expense/${itemId}.json`)
        .success( (expenseObj) => {
          resolve(expenseObj)
        });
      });
    };


    return {
        newBudgetItem,
        deleteBudgetItem,
        updateBudgetItem,
        getBudgetList,
        getSingleBudgetItem,
        getSingleBudgetName,
        clearExpenseMonthly,
        newExpenseItem,
        updateExpenseItem,
        getExpenseList,
        getSingleExpenseItem,
        deleteExpenseItem

    };
});
