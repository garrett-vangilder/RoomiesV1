"use strict";

app.factory("HomeFactory", ($q, $http, FirebaseURL) => {

    let createHome = (homeItem) => {
        return $q((resolve, reject) => {
            $http.post(`${FirebaseURL}/homes.json`, JSON.stringify(homeItem))
                .success((ObjectFromFirebase) => {
                    resolve(ObjectFromFirebase);
                })
                .error((error) => {
                    reject(error);
                });
        });
    };

    let getUsersHome = (userID) => {
        return $q((resolve, reject) => {
            $http.get(`${FirebaseURL}/homes.json`)
                .then((data) => {
                  console.log(data);
                    let homeArray = convertResultsToArray(data.data, 'homeid', userID);
                    console.log(homeArray)
                    let usersHome = filterArrayByID(homeArray, 'houseMemberUid', userID);
                    console.log(usersHome);
                    resolve(usersHome);
                }, (error) => {
                    console.error(error);
                    reject(error);
                });
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
        })
        return filteredData;
    }


    return {
        createHome,
        getUsersHome
    };
});
