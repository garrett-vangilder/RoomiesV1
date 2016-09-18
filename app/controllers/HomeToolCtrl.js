"use strict";

app.controller("HomeToolCtrl", function($scope, $routeParams, AuthFactory, HomeFactory, $window, $location) {

    $scope.homeId = HomeFactory.getUsersHome().then(console.log("home id?", $scope.homeId));

    $scope.homeTools = [{
            url: `#/grocerylist/${$routeParams.homeid}`,
            name: "Grocery List"
        }, {
            url: `#/chores/${$routeParams.homeid}`,
            name: "Chores"
        }, {
            url: `#/budget/${$routeParams.homeid}`,
            name: "Budget"
        }, {
            url: `#/invite-housemate/${AuthFactory.getUid()}`,
            name: "Invite Housemate"
        }, {
            url: `#/messages/${AuthFactory.getUid()}`,
            name: "Messages"
        },
        {
            url: `#/info/${$routeParams.homeid}`,
            name: "Profile"
        },
    ];


});
