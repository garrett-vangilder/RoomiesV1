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

    let clearExpenseMonthly = (houseId) => {

    }

    let newExpenseItem = (houseId) => {

    };

    let updateExpenseItem = (itemId) => {

    }

    let getExpenseList = (houseId) => {

    }

    let getSingleExpenseItem = (itemId) => {

    }

    let deleteExpenseItem = (itemId) => {

    }


    return {
        newBudgetItem,
        deleteBudgetItem,
        updateBudgetItem,
        getBudgetList,
        getSingleBudgetItem,
        clearExpenseMonthly,
        newExpenseItem,
        updateExpenseItem,
        getExpenseList,
        getSingleExpenseItem,
        deleteExpenseItem

    };
});
