// "use strict";
//
// app.factory("HomeFactory", ($q, $http, FirebaseURL) => {
//   let createHome = (homeItem, uid) => {
//     return $q( (resolve, reject) => {
//       $http.post(`${FirebaseURL}/homes.json`, JSON.stringify(homeItem))
//       .success( (ObjectFromFirebase) => {
//         resolve(ObjectFromFirebase);
//       })
//       .error( (error) => {
//         reject(error);
//       });
//     });
//   };
//
//   return {createHome};
// });
