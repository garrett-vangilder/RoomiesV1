"use strict";

app.controller("HomeToolCtrl", function($scope, $routeParams, AuthFactory, HomeFactory, $window, $location) {

    $scope.homeId = HomeFactory.getUsersHome().then(console.log("home id?", $scope.homeId));

    $scope.homeTools = [{
            url: `#/grocerylist/${AuthFactory.getHouseid()}`,
            name: "Grocery List"
        }, {
            url: `#/chores/${AuthFactory.getHouseid()}`,
            name: "Chores"
        }, {
            url: `#/budget/${AuthFactory.getHouseid()}`,
            name: "Budget"
        }, {
            url: `#/invite-housemate/${AuthFactory.getUid()}`,
            name: "Invite Housemate"
        }, {
            url: `#/messages/${AuthFactory.getUid()}`,
            name: "Messages"
        },
        {
            url: `#/info/${AuthFactory.getHouseid()}`,
            name: "Profile"
        },
    ];


});
