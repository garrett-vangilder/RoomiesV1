"use strict";

app.factory("AuthFactory", function($q, $http, FirebaseURL) {

    let _uid = null;
    let _houseid = null;
    let singleUser = [];
    let filteredUser = [];
    let filteredHome = '';
    let filteredName = '';
    let initialized = false;
    let loggedInUser = null

    firebase.auth().onAuthStateChanged(function(user) {
        _uid = user.uid;
    });

    let getUid = function() {
        return _uid;
    };

    let getHouseid = function() {
        return _houseid;
    }

    let createUser = function(userObj) {
        console.log('creating user via FB')
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    };

    let createUserFb = function(userObj) {
        console.log("creating user via fake FB")
        return $q((resolve, reject) => {
            $http.post(`${FirebaseURL}/users.json`, userObj).then((uid) => {
                resolve(uid);
            }), (error) => {
                console.error(error);
                reject(error);
            }
        });
    };

    let getSingleUser = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
                .success((obj) => {
                    Object.keys(obj).forEach((key) => {
                        obj[key].id = key;
                        singleUser.push(obj[key]);
                    })
                    filteredUser = filterArrayByID(singleUser, "uid", userId)
                    resolve(filteredUser);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    let getUsersFirstName = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
                .success((obj) => {
                    Object.keys(obj).forEach((key) => {
                        obj[key].id = key;
                        singleUser.push(obj[key]);
                    });
                    filteredUser = filterArrayByID(singleUser, "id", userId);
                    filteredName = filteredUser[0].firstName;
                    resolve(filteredName);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    let getUsersHomeId = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
                .success((obj) => {
                    Object.keys(obj).forEach((key) => {
                        obj[key].id = key;
                        singleUser.push(obj[key]);
                    });
                    filteredUser = filterArrayByID(singleUser, "id", userId);
                    filteredHome = filteredUser[0].homeid
                    console.log("should happen on login want to see what you get back", filteredHome);
                    resolve(filteredHome);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };


    let getSingleUserForLogin = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
                .success((obj) => {
                    Object.keys(obj).forEach((key) => {
                        obj[key].id = key;
                        singleUser.push(obj[key]);
                    })
                    filteredUser = filterArrayByID(singleUser, "id", userId)
                    console.log('second filteredUser', filteredUser)
                    resolve(filteredUser);
                })
                .error((error) => {
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
        console.log("patching single user")
        return $q((resolve, reject) => {
            $http.put(`${FirebaseURL}/users/${itemId}.json`, JSON.stringify(obj))
                .success((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .error((error) => {
                    reject(error);
                })
        })
    };




    let loginUser = function(userObj) {
        console.log('logging in single user');
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    };



    let logoutUser = function() {
        return firebase.auth().signOut();
    };

    let getUser = () => {
        return loggedInUser;
    }

    let isAuthenticated = function() {

      return (firebase.auth().currentUser) ? true: false;
  };

    return {
        createUser,
        loginUser,
        logoutUser,
        getUid,
        getHouseid,
        createUserFb,
        getSingleUser,
        patchSingleUser,
        getSingleUserForLogin,
        getUsersFirstName,
        getUsersHomeId,
        getUser,
        isAuthenticated
    };
});
