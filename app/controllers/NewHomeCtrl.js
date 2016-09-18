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

        AuthFactory.createUser({
                email: $scope.account.email,
                password: $scope.account.password
            })
            .then((userData) => {
                $scope.createUserFb(userData);
            }, (error) => {
                console.log("Error Creating home and new User");
            });
    };

    $scope.createUserFb = (userData) => {
        AuthFactory.createUserFb({
            "email": $scope.account.email,
            "password": $scope.account.password,
            "firstName": $scope.newUserObj.firstName,
            "lastName": $scope.newUserObj.lastName,
            "uid": userData.uid,
            'homeid': null
        }).then(function(userData) {
            $scope.loginRegisteredUser();
        });
    };



    $scope.loginRegisteredUser = () => {
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    $scope.uid = data.uid;
                    $window.location.href = "#registerhome";
                    return $scope.uid;
                } else {
                    $window.location.href = "#/login";
                }
            }, (error) => {
                console.log("You have an error");
            });
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
            HomeFactory.getSingleHome(ObjectFromFirebase.name).then(function(obj) {
                let homeid = ObjectFromFirebase.name;
                obj.homeid = homeid;
                HomeFactory.patchHomeItem(ObjectFromFirebase.name, obj).then(function(obj2) {
                    $scope.assignHometoUser(AuthFactory.getUid(), ObjectFromFirebase.name).then(function(obj3) {});
                });
            });
        });
    };

    $scope.assignHometoUser = function(userID, homeId) {
        let user = AuthFactory.getSingleUser(userID).then(function(user) {
            user[0].homeid = homeId;
            AuthFactory.patchSingleUser(userID, user[0]).then(function(newObj) {
                if (newObj) {
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
                    AuthFactory.getSingleUserForLogin(data.uid).then(function(filteredUser) {
                        console.log(filteredUser[0].homeid, "filteredUser");
                        let homeid = filteredUser[0].homeid;
                        $window.location.href = `#/home-tools/${homeid}`;
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
        let user = AuthFactory.getSingleUser(_uid).then(function(user) {
            user[0].homeid = homeId;
            HomeFactory.getSingleHome(homeId).then(function(singleHomeObj) {
                singleHomeObj.houseMemberUid.push(_uid);
                HomeFactory.patchHomeItem(homeId, singleHomeObj).then(function(newHome) {});
            });
            AuthFactory.patchSingleUser(_uid, user[0]).then(function(newObj) {
                if (newObj) {
                    $window.location.href = `#/home-tools/${newObj.homeid}`;
                } else {
                    $window.location.href = `#/`;
                }
            });
        });
    };

});
