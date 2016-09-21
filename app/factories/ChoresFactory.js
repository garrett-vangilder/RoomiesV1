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



  let getSingleChoreItem = (itemId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}/chores/${itemId}.json`)
      .success( (choreObj) =>{
        resolve(choreObj)
      })
      .error( (error) => {
        reject(error);
      });
    });
  };



  let patchChoreItem = (itemId, choreObj) => {
    return $q( (resolve, reject) => {
      $http.patch(`${FirebaseURL}/chores/${itemId}.json`, JSON.stringify(choreObj))
      .success( (ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let deleteChoreItem = (itemId) => {
    return $q( (resolve, reject) => {
      $http.delete(`${FirebaseURL}/chores/${itemId}.json`)
      .success( (choreObj) => {
        resolve(choreObj);
      });
    });
  };

return {getChoresList, newChore, patchChoreItem, getSingleChoreItem, deleteChoreItem };
});
