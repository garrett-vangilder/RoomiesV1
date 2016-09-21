app.controller("ChoresViewCtrl", function($scope, $window, $routeParams, ChoresFactory, HomeFactory, AuthFactory) {
    let _homeid = $routeParams.homeid;
    let _uid = AuthFactory.getUid();
    $scope.roommateList = [];

    $scope.newChoreItem = {
        "task": "",
        "dueDate": "",
        "assignedTo": "",
        "uid": _uid,
        "houseId": _homeid,
        "completed": false
    };

    $scope.addChoreItem = function() {
        ChoresFactory.newChore($scope.newChoreItem)
            .then(function() {
                $scope.getChoresList();
            });
    };

    $scope.getChoresList = function() {
        ChoresFactory.getChoresList(_homeid).then(function(filteredChoresArray) {
            $scope.chores = filteredChoresArray;
        });
    };

    $scope.completedTask = function(itemId) {
        ChoresFactory.getSingleChoreItem(itemId).then(function(choreObj) {
            choreObj.completed = true;
            ChoresFactory.patchChoreItem(itemId, choreObj).then(function() {
                $scope.getChoresList();
            })
        })
    };

    $scope.deleteItem = function(itemId) {
        ChoresFactory.deleteChoreItem(itemId).then(function(choreObj) {
            $scope.getChoresList();

        })
    };


    $scope.getRoommateList = function() {
        HomeFactory.getSingleHome($routeParams.homeid).then(function(obj) {
            angular.forEach(obj.houseMemberUid, function(value) {
                AuthFactory.getUsersFirstName(value).then(function(filteredName) {
                    $scope.roommateList.push(filteredName)
                })
            })
        })
    }

});
