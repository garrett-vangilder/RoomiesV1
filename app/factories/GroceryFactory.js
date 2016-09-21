"use strict";

app.factory("GroceryFactory", function($q, $http, FBCreds, FirebaseURL) {

  let getGroceryList = (houseId) => {
    let groceryList = [];
    let ownedList = [];
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}/grocery.json?orderBy="houseId"&equalTo="${houseId}"`)
      .success( (groceryObj) => {
        Object.keys(groceryObj).forEach((key) => {
          groceryObj[key].id = key;
          groceryList.push(groceryObj[key]);
        })
        resolve(groceryList);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };



  let newGroceryItem = (groceryObj) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseURL}/grocery.json`, groceryObj).then( (groceryID) => {
        resolve(groceryID);
      }), (error) => {
        console.error(error);
        reject(error);
      }
    });
  };

  let patchGroceryItem = (itemId, groceryObj) => {
    return $q( (resolve, reject) => {
      $http.patch(`${FirebaseURL}/grocery/${itemId}.json`, JSON.stringify(groceryObj))
      .success( (ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };


  let getSingleGroceryItem = (itemId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}/grocery/${itemId}.json`)
      .success( (groceryObj) => {
        resolve(groceryObj)
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let deleteGroceryItem = (itemId) => {
    return $q( (resolve, reject) => {
      $http.delete(`${FirebaseURL}/grocery/${itemId}.json`)
      .success( (groceryObj) => {
        resolve(groceryObj);
      });
    });
  };

  let filtergroceryList = (data, idType, ID) => {
      let filteredData = data.filter((element) => {
          return element[idType] === ID;
      })
      return filteredData;
  }

  return {newGroceryItem, getGroceryList, getSingleGroceryItem, patchGroceryItem, deleteGroceryItem, filtergroceryList };
});
