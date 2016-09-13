app.controller("NewHomeCtrl", function($scope, $window, AuthFactory) {
    $scope.account = {
        email: "",
        password: "",
         userName: ""
    };
    // $scope.homeInfo = {
    //     address: "",
    //     houseName: ""
    // };

    $scope.registerUserAndHome = () => {
        console.log("register with me. Hail Mary!");
        AuthFactory.createUser({
            email: $scope.account.email,
            password: $scope.account.password,
            userName: $scope.account.userName
        })
        .then((userData) => {
            // HomeFactory.createHome({
            //         address: $scope.homeInfo.address,
            //         houseName: $scope.homeInfo.houseName,
            //         numberOfResidents: 1,
            //         houseMemeber: userData.uid
            //     },
            //     userData);
            $scope.login();
        }, (error) => {
            console.log("Error Creating home and new User");
        });
    }

    $scope.login = () => {
        AuthFactory.loginUser($scope.account)
            .then((data) => {
                if (data) {
                    $window.location.href = "#/profile/:homeid"
                } else {
                    $window.location.href = "#/login"
                }
            }, (error) => {
                console.log("You have an error")
            });
    };
});
