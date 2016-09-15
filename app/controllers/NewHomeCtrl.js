app.controller("NewHomeCtrl", function($scope, $window, AuthFactory, $routeParams, HomeFactory) {
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
        console.log("register with me. Hail Mary!");
        AuthFactory.createUser({
                email: $scope.account.email,
                password: $scope.account.password,
                userName: $scope.account.userName,
            })
            .then((userData) => {
                $scope.goMore = true;
            }, (error) => {
                console.log("Error Creating home and new User");
            });
    };

    $scope.createUserFb = () => {
        AuthFactory.createUserFb({
            "email": $scope.account.email,
            "password": $scope.account.password,
            "firstName": $scope.newUserObj.firstName,
            "lastName": $scope.newUserObj.lastName,
            "uid": AuthFactory.getUid(),
            'homeid': 'FAKE'
        }).then(function(userData) {
            $scope.loginRegisteredUser();
        })
    };



    $scope.loginRegisteredUser = () => {
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    $window.location.href = "#registerhome"
                } else {
                    $window.location.href = "#/login"
                }
            }, (error) => {
                console.log("You have an error")
            });
    };

    $scope.registerNewHome = () => {
        let _uid = AuthFactory.getUid()
        HomeFactory.createHome({
            "streetAddress": $scope.homeItem.streetAddress,
            "houseName": $scope.homeItem.houseName,
            "houseMemberUid": [AuthFactory.getUid()],
            "city": $scope.homeItem.city,
            "state": $scope.homeItem.state,
            "zipCode": $scope.homeItem.zipCode,
            "password": $scope.homeItem.password,
            "homeid": "FAKE"
        }).then(function(ObjectFromFirebase) {
          HomeFactory.getSingleHome(ObjectFromFirebase.name).then(function(obj) {
            let homeid = ObjectFromFirebase.name;
            obj.homeid = homeid;
            HomeFactory.patchHomeItem(ObjectFromFirebase.name, obj).then( function(obj2) {
              console.log("object after homeId attached", obj2);
              $scope.assignHometoUser(AuthFactory.getUid(), ObjectFromFirebase.name);
              // AuthFactory.getSingleUser(AuthFactory.getUid()).then( function(obj3) {
              //   console.log("Got single user", obj3);
                // obj3.homeid = ObjectFromFirebase.name;
                // AuthFactory.patchSingleUser(obj3.uid, ob3).then(function(ObjectFromFirebase2) {
                //   console.log("final user obj", ObjectFromFirebase2);
                // })
              // })
            })
          });
        });
    };

    $scope.assignHometoUser = function(userID, homeId) {
      let user = AuthFactory.getSingleUser(userID).then(function(user) {
        console.log("user ", user);
        console.log("user homeid", user[0].homeid);
        user[0].homeid = homeId;
        AuthFactory.patchSingleUser(userID, user[0]).then(function(newObj) {
          console.log("Final User item", newObj);
        })
      })
  }





    $scope.login = () => {
        console.log("YOURE GOING TO LOGIN");
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    HomeFactory.getUsersHome(AuthFactory.getUid())
                    console.log("Works")
                        .then(function() {
                            $window.location.href = `#/home-tools/${HomeFactory.getHouseid()}`;
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
            console.log("$scope.homeList", $scope.homeList);
        });
    };

    $scope.confirmHomeSearch = (itemId) => {
        HomeFactory.getSingleHome(itemId).then(function(obj) {
            obj.houseMemberUid.push(_uid);
            HomeFactory.patchHomeItem(itemId, obj).then(function() {
                AuthFactory.getSingleUser(_uid).then(function(obj2) {
                    obj2.homeid = "itemId";
                    AuthFactory.patchSingleUser(_uid, obj2).then(function() {
                        console.log("obj2", obj2);
                    });
                });
            });
        });
    };




})
