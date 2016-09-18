"use strict";

app.factory("MessageFactory", function($q, $http, FBCreds, FirebaseURL) {

  let getMessageList = (houseId) => {
    let messageList = [];
    return( (resolve, reject) => {
      $http.get(`${FirebaseURL}/message.json?orderBy="houseId"&equalTo="${houseId}"`)
      .success( (messageObj) => {
        Object.keys(messageObj).forEach((key) => {
          messageObj[key].id = key;
          messageList.push(messageObj[key]);
        });
        resolve(messageList)
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let submitMessage = (messageObj) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseURL}/message.json`, messageObj).then( (messageID) => {
        resolve(messageID);
      }), (error) => {
        console.error(error)
        reject(error);
      }
    });
  };

  return {getMessageList, submitMessage};

});
