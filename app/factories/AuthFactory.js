"use strict";

app.factory("AuthFactory", function($q, $http, FirebaseURL) {

  let _uid = null;
  let _houseid = null;

  firebase.auth().onAuthStateChanged(function (user) {
    _uid = user.uid;
    _houseid = user.houseid;
  });

  let getUid = function() {
    return _uid;
  };

  let getHouseid = function() {
    return _houseid;
  }

  let createUser = function(userObj) {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
      .catch( function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  };

  let createUserFb = function(userObj) {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseURL}/users.json`, userObj).then( (uid) => {
        console.log('uid from createUserFb', uid.data.name);
        resolve(uid);
      }), (error) => {
        console.error(error);
        reject(error);
      }
    });
  };


  let getSingleUser = (userId) => {
    let singleUser = [];
    let filteredUser = [];
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
      .success( (obj) => {
        Object.keys(obj).forEach( (key) => {
          obj[key].id = key;
          singleUser.push(obj[key]);
        })
        filteredUser = filterArrayByID(singleUser, "uid", userId)
        resolve(filteredUser);
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let filterArrayByID = (data, idType, ID) => {
      let filteredData = data.filter((element) => {
          return element[idType] === ID;
      })
      return filteredData;
  };


  let patchSingleUser = (itemId, obj) => {
    return $q( (resolve, reject) => {
      $http.put(`${FirebaseURL}/users/${itemId}.json`, JSON.stringify(obj))
      .success( (ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .error( (error) => {
        reject(error);
      })
    })
  };




let loginUser = function(userObj) {
  return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
};



let logoutUser = function() {
    return firebase.auth().signOut();
};

return {createUser, loginUser, logoutUser, getUid, getHouseid, createUserFb, getSingleUser, patchSingleUser};
});
