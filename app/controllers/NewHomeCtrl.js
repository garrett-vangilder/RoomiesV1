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

    $scope.homeInfo = {
        "address": "",
        "houseName": "",
        "houseMemberUid": [],
        "streetAddress": "",
        "city": "",
        "state": "",
        "zipCode": "",
        "password": ""
    };

    $scope.registerUser = () => {
        console.log("register with me. Hail Mary!");
        AuthFactory.createUser({
                email: $scope.account.email,
                password: $scope.account.password,
                userName: $scope.account.userName
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
            "uid": AuthFactory.getUid()
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
        console.log("Register a new home with me. Hail Mary");
        // $scope.homeInfo.houseMemberUid: AuthFactory.getUid();
        HomeFactory.createHome({
            "streetAddress": $scope.homeInfo.streetAddress,
            "houseName": $scope.homeInfo.houseName,
            "houseMemberUid": [AuthFactory.getUid()],
            "city": $scope.homeInfo.city,
            "state": $scope.homeInfo.state,
            "zipCode": $scope.homeInfo.zipCode,
            "password": $scope.homeInfo.password
        });
    };



    $scope.login = () => {
        console.log("YOURE GOING TO LOGIN");
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    HomeFactory.getUsersHome(AuthFactory.getUid())
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
    $scope.homeSearch = {
        "zipCode": ""
    };
    $scope.homeList = [];

    $scope.searchByZip = (zipCode) => {
         HomeFactory.searchByZip(zipCode).then( function(homeList) {
            $scope.homeList = homeList;
            console.log("$scope.homeList", $scope.homeList);
        })
    };

    // $scope.getGroceryList = function() {
    //     GroceryFactory.getGroceryList(_homeid).then(function(filteredGroceryArray) {
    //         $scope.purchasedList =   GroceryFactory.filtergroceryList(filteredGroceryArray, 'purchased', true);
    //         console.log("purchasedlist", $scope.purchasedList)
    //         $scope.groceryList = GroceryFactory.filtergroceryList(filteredGroceryArray, 'purchased', false);
    //     });
    // };


})
