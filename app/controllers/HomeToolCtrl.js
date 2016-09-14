"use strict";

app.controller("HomeToolCtrl", function($scope, $routeParams, AuthFactory, HomeFactory, $window, $location) {

    $scope.homeTools = [{
            url: `#/grocerylist/${HomeFactory.getHouseid()}`,
            name: "Grocery List"
        }, {
            url: `#/chores/${HomeFactory.getHouseid()}`,
            name: "Chores"
        }, {
            url: `#/budget/${HomeFactory.getHouseid()}`,
            name: "Budget"
        }, {
            url: `#/invite-housemate/${AuthFactory.getUid()}`,
            name: "Invite Housemate"
        }, {
            url: `#/messages/${AuthFactory.getUid()}`,
            name: "Messages"
        },
        {
            url: `#/info/${HomeFactory.getHouseid()}`,
            name: "Profile"
        },
    ];


});
