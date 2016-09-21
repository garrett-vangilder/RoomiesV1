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

    $scope.home = {};

    $scope.getUserInfo = function() {
      AuthFactory.getSingleUser(AuthFactory.getUid()).then(function(filteredUser) {
        $scope.userInfo.firstName = filteredUser[0].firstName;
        $scope.userInfo.homeId = filteredUser[0].homeid;
        $scope.userInfo.uid = filteredUser[0].uid;
        HomeFactory.getSingleHome($routeParams.homeid).then(function(obj) {
          $scope.userHomeInfo.name = obj.houseName;
          $scope.userHomeInfo.streetAddress = obj.streetAddress;
          $scope.userHomeInfo.city = obj.city;
          $scope.userHomeInfo.state = obj.state;
          $scope.userHomeInfo.zipCode = obj.zipCode;
          $scope.userHomeInfo.houseMembers = obj.houseMemberUid;
          let roommates = obj.houseMemberUid;
          angular.forEach(obj.houseMemberUid, function(value) {
            AuthFactory.getUsersFirstName(value).then(function(filteredName) {
              $scope.roommateNameList.push(filteredName)
            })
          });
        });
      });
    };

    $scope.updateHome = function() {
      HomeFactory.getSingleHome($routeParams.homeid).then(function(obj) {
        obj.streetAddress = $scope.home.streetAddress;
        obj.city = $scope.home.city;
        obj.state = $scope.home.state;
        HomeFactory.patchHomeItem(obj.homeid, obj).then(function(newObj) {
          $scope.isEdit = false;
          $scope.userHomeInfo.name = newObj.houseName;
          $scope.userHomeInfo.streetAddress = newObj.streetAddress;
          $scope.userHomeInfo.city = newObj.city;
          $scope.userHomeInfo.state = newObj.state;
          $scope.userHomeInfo.zipCode = newObj.zipCode;
        })
      })
    }

    $scope.leaveHome = function() {
      AuthFactory.getSingleUser(AuthFactory.getUid()).then(function(obj) {
        console.log("what did you get?", obj)
        let user = obj[obj.length - 1]
        HomeFactory.getSingleHome(obj[obj.length - 1].homeid).then(function(homeobj) {
          console.log('homeobj', homeobj);
            let roommates = homeobj.houseMemberUid;
          angular.forEach(roommates, function(value) {
            console.log('value in the loop', value);
            if (value === user.uid) {
               let index = roommates.indexOf(value)
               if (index > -1 ) {
                 roommates.splice(index, 1)
                 homeobj.houseMemberUid = roommates
                console.log("does this work?", homeobj.houseMemberUid)
                HomeFactory.patchHomeItem(homeobj.homeid, homeobj).then(function() {
                })
               }
            }
          })
          user.homeid = null;
          AuthFactory.patchSingleUser(user.id, user).then(function(obj2) {
            console.log("new user", obj2 )
            $window.location.href = "#registerhome";
          })
        })
      })
    }

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
