"use strict";

app.controller("HomeToolCtrl", function($scope, $routeParams, AuthFactory, HomeFactory, $window, $location) {


    $scope.userInfo = {
      firstName: "",
      homeId: "",
      uid: ""
    };

    $scope.userHomeInfo = {
      streetAddress:"",
      city: "",
      state: "",
      zipCode: "",
      houseMembers: []
    };
    $scope.roommateNameList = [];

    $scope.getUserInfo = function() {
      console.log("working!")
      AuthFactory.getSingleUser(AuthFactory.getUid()).then(function(filteredUser) {
        console.log("THis is given to the home tool page", filteredUser)
        $scope.userInfo.firstName = filteredUser[0].firstName;
        $scope.userInfo.homeId = filteredUser[0].homeid;
        $scope.userInfo.uid = filteredUser[0].uid;
        HomeFactory.getSingleHome($routeParams.homeid).then(function(obj) {
          console.log("User's home", obj)
          $scope.userHomeInfo.name = obj.houseName;
          $scope.userHomeInfo.streetAddress = obj.streetAddress;
          $scope.userHomeInfo.city = obj.city;
          $scope.userHomeInfo.state = obj.state;
          $scope.userHomeInfo.zipCode = obj.zipCode;
          $scope.userHomeInfo.houseMembers = obj.houseMemberUid;
          let roommates = obj.houseMemberUid;
          console.log("$scope.userHomeInfo.houseMembers", roommates)
          angular.forEach(obj.houseMemberUid, function(value) {
            AuthFactory.getUsersFirstName(value).then(function(filteredName) {
              $scope.roommateNameList.push(filteredName)
              console.log("namelist?", $scope.roommateNameList)
            })
            console.log("value from forEach loop", value)
          });
        });
      });
    };

//     var app = angular.module('testModule', []);
//
// app.controller('testController', function($scope, $http){
//    $http.get('Data/info.json').then(
//       function(data){
//          $scope.data = data;
//       }
//    );
//
//    angular.forEach($scope.data, function(value, key){
//       if(value.Password == "thomasTheKing")
//          console.log("username is thomas");
//    });
// });



    $scope.homeTools = [{
            url: `#/grocerylist/${$routeParams.homeid}`,
            name: "Grocery List"
        }, {
            url: `#/chores/${$routeParams.homeid}`,
            name: "Chores"
        }, {
            url: `#/budget/${$routeParams.homeid}`,
            name: "Budget"
        },
        // {
        //     url: `#/invite-housemate/${AuthFactory.getUid()}`,
        //     name: "Invite Housemate"
        // },
        {
            url: `#/messages/${AuthFactory.getUid()}`,
            name: "Messages"
        }
        // {
        //     url: `#/info/${$routeParams.homeid}`,
        //     name: "Profile"
        // },
    ];


});
