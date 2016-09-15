"use strict";

app.factory("HomeFactory", ($q, $http, FirebaseURL) => {

  let _houseid = null;

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
            $http.get(`${FirebaseURL}/homes/$orderBy="houseMemberUid"&equalTo="${userID}".json`)
                .then((data) => {
                  console.log(data);
                    // let homeArray = convertResultsToArray(data.data, 'homeid', userID);
                    // console.log("homeArray in HF", homeArray);
                    // let usersHome = filterArrayByID(homeArray, 'houseMemberUid.key', userID);
                    console.log("usersHome in HF", usersHome);
                    _houseid = usersHome[0].homeid;
                    resolve(usersHome, _houseid);
                }, (error) => {
                    console.error(error);
                    reject(error);
                });
        });
    };

    let patchHomeItem = (itemId, obj) => {
      return $q( (resolve, reject) => {
        $http.patch(`${FirebaseURL}/homes/${itemId}.json`, JSON.stringify(obj))
        .success( (ObjectFromFirebase) => {
          resolve(ObjectFromFirebase);
        })
        .error( (error) => {
          reject(error);
        })
      })
    };

    let getSingleHome = (itemId) => {
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/homes/${itemId}.json`)
        .success( (obj) => {
          resolve(obj)
        })
        .error( (error) => {
          reject(error);
        });
      });
    };

    let searchByZip = (zip) => {
      let homeList = [];
      return $q( (resolve, reject) => {
        $http.get(`${FirebaseURL}/homes.json?orderBy="zipCode"&equalTo="${zip}"`)
        .success( (homeObj) => {
          Object.keys(homeObj).forEach( (key) => {
            homeObj[key].id = key;
            homeList.push(homeObj[key]);
          })
          resolve(homeList);
        })
        .error( (error) => {
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
    };

    let getHouseid = function() {
      return _houseid;
    }


    return {
        createHome,
        getUsersHome,
        getHouseid,
        searchByZip,
        patchHomeItem,
        getSingleHome
    };
});
