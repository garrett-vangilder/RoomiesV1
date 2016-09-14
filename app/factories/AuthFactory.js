"use strict";

app.factory("AuthFactory", function($q, $http, FirebaseURL) {

  let _uid = null;
  let _houseid = null;

  firebase.auth().onAuthStateChanged(function (user) {
    console.log('Auth State has changed');
    _uid = user.uid;
    console.log("uid is now", _uid);
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
  }

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

return {createUser, loginUser, logoutUser, getUid, getHouseid};
});
