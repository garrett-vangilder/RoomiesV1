app.controller("NewHomeCtrl", function($scope, $window, AuthFactory, $routeParams, HomeFactory) {
    $scope.uid = '';
    $scope.newUserObj = {
        "firstName": "",
        "lastName": "",
        "uid": "",
        "email": "",
        "password": ""
    };

    $scope.account = {
        "email": "",
        "password": ""
    };

    $scope.homeItem = {
        "address": "",
        "houseName": "",
        "houseMemberUid": [],
        "streetAddress": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "password": "",
        "homeid": ""
    };

    $scope.registerUser = () => {
        console.log("Register user");
        AuthFactory.createUser({
                email: $scope.account.email,
                password: $scope.account.password
            })
            .then((userData) => {
                console.log("userdata after FB made, before We make", userData);
                $scope.createUserFb(userData);
            }, (error) => {
                console.log("Error Creating home and new User");
            });
    };

    $scope.createUserFb = (userData) => {
        console.log("creating user on Firebase")
        AuthFactory.createUserFb({
            "email": $scope.account.email,
            "password": $scope.account.password,
            "firstName": $scope.newUserObj.firstName,
            "lastName": $scope.newUserObj.lastName,
            "uid": userData.uid,
            'homeid': null
        }).then(function(userData) {
            $scope.loginRegisteredUser();
        })
    };



    $scope.loginRegisteredUser = () => {
        console.log("loging in registered user to register their home")
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    console.log('data before sending to register to home', data);
                    $scope.uid = data.uid;
                    console.log("$scope.uid inside loginRegisteredUser", $scope.uid);
                    $window.location.href = "#registerhome"
                    console.log("now returning scope.uid", $scope.uid);
                    return $scope.uid;
                    console.log("should not fire");
                } else {
                    $window.location.href = "#/login"
                }
            }, (error) => {
                console.log("You have an error")
            });
            console.log("now returning scope.uid", $scope.uid);
            return $scope.uid;
    };

    $scope.registerNewHome = () => {
        let _uid = AuthFactory.getUid();
        HomeFactory.createHome({
            "streetAddress": $scope.homeItem.streetAddress,
            "houseName": $scope.homeItem.houseName,
            "houseMemberUid": [_uid],
            "city": $scope.homeItem.city,
            "state": $scope.homeItem.state,
            "zipCode": $scope.homeItem.zipCode,
            "password": $scope.homeItem.password,
            "homeid": ""
        }).then(function(ObjectFromFirebase) {
            console.log("getting a single home and patching with homeid", ObjectFromFirebase);
            HomeFactory.getSingleHome(ObjectFromFirebase.name).then(function(obj) {
                let homeid = ObjectFromFirebase.name;
                obj.homeid = homeid;
                HomeFactory.patchHomeItem(ObjectFromFirebase.name, obj).then(function(obj2) {
                    $scope.assignHometoUser(AuthFactory.getUid(), ObjectFromFirebase.name).then(function(obj3) {
                        console.log('assigning the home to the user, sending user to the house tools');
                    })
                });
            });
        });
    };

    $scope.assignHometoUser = function(userID, homeId) {
        console.log("assigning the home to the user")
        let user = AuthFactory.getSingleUser(userID).then(function(user) {
            console.log('user before being patched', user);
            user[0].homeid = homeId;
            AuthFactory.patchSingleUser(userID, user[0]).then(function(newObj) {
                if (newObj) {
                    console.log("new object after home is assigned to user", newObj);
                    $window.location.href = `#/home-tools/${newObj.homeid}`;
                } else {
                    $window.location.href = `#/`;
                }
            });
        });
    };





    $scope.login = () => {
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    AuthFactory.getSingleUser(data.uid).then(function(filteredUser) {
                            console.log("Works", filteredUser);
                        })
                        .then(function() {
                            $window.location.href = `#/home-tools/${AuthFactory.getHouseid()}`;
                        });
                } else {
                    $window.location.href = "#/";
                }
            }, (error) => {
                console.log("YOU HAVE AN ERROR");
            });
    };
});

app.controller("SearchCtrl", function($scope, $window, AuthFactory, $routeParams, HomeFactory) {
    let _uid = AuthFactory.getUid();

    $scope.homeSearch = {
        "zipCode": ""
    };
    $scope.homeList = [];

    $scope.searchByZip = (zipCode) => {
        HomeFactory.searchByZip(zipCode).then(function(homeList) {
            $scope.homeList = homeList;
        });
    };


    $scope.confirmHomeSearch = function(homeId) {
      let _uid = AuthFactory.getUid();
      console.log("user id", _uid);
        console.log("assigning the home to the user need homeId", homeId);
        let user = AuthFactory.getSingleUser(_uid).then(function(user) {
            console.log('user before being patched', user);
            user[0].homeid = homeId;
            console.log("user[0].homeid after homeId is assigned", user[0].homeid);
            HomeFactory.getSingleHome(homeId).then(function(singleHomeObj) {
              singleHomeObj.houseMemberUid.push(_uid);
              HomeFactory.patchHomeItem(homeId, singleHomeObj).then(function(newHome) {
                console.log("newHome after it has been patched", newHome);
              })
            });
            AuthFactory.patchSingleUser(_uid, user[0]).then(function(newObj) {
                if (newObj) {
                    console.log("new object after home is assigned to user", newObj);
                    $window.location.href = `#/home-tools/${newObj.homeid}`;
                } else {
                    $window.location.href = `#/`;
                }
            });
        });
    };


//     $scope.confirmHomeSearch = (itemId) => {
//     HomeFactory.getSingleHome(itemId).then(function(obj) {
//         obj.houseMemberUid.push(_uid);
//         HomeFactory.patchHomeItem(itemId, obj).then(function() {
//             AuthFactory.getSingleUser(_uid).then(function(obj2) {
//                 obj2.homeid = "itemId";
//                 AuthFactory.patchSingleUser(_uid, obj2).then(function() {
//                     console.log("obj2", obj2);
//                 });
//             });
//         });
//     });
// };

});
