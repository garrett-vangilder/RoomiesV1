"use strict";

app.factory("ChoresFactory", function($q, $http, FBCreds, FirebaseURL) {



  let newChore = (choreObj) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseURL}/chores.json`, choreObj).then( (choreID) => {
        resolve(choreID);
      }), (error) => {
        console.error(error);
        reject(error);
      }
    });
  };

  let getChoresList = (houseId) => {
    let choresList = [];
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}/chores.json?orderBy="houseId"&equalTo="${houseId}"`)
      .success( (choresObj) => {
        console.log("choresObj before loop", choresObj);
        Object.keys(choresObj).forEach( (key) => {
          choresObj[key].id = key;
          choresList.push(choresObj[key]);
        })
        resolve(choresList);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

return {getChoresList, newChore };
});
