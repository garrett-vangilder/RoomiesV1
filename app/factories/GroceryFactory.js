"use strict";

app.factory("GroceryFactory", function($q, $http, FBCreds, FirebaseURL) {

  let getGroceryList = (houseId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}/grocery.json`)
      .then((data) => {
        let groceryArray = convertResultsToArray(data.data, 'homeid', houseId);
        let filteredGroceryArray = filterArrayByID(groceryArray,'homeid', houseId);
        resolve(filteredGroceryArray);
      }, (error) => {
        console.log(error);
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

  let convertResultsToArray = (object, idType, uid) => {
      let resultsArray = [];
      let keysArray = Object.keys(object);
      keysArray.forEach((key) => {
          object[key][idType] = key;
          resultsArray.push(object[key]);
      });
      return resultsArray;
  };

  let filterArrayByID = (data, idType, ID) => {
      let filteredData = data.filter((element) => {
          return element[idType] === ID;
      });
      return filteredData;
  };
  return {newGroceryItem, getGroceryList };
});
