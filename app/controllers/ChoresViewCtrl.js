app.controller("ChoresViewCtrl", function($scope, $window,$routeParams, ChoresFactory,HomeFactory, AuthFactory) {
  let _homeid = $routeParams.homeid;
  let _uid = AuthFactory.getUid();

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
    .then( function() {
      $scope.getChoresList();
    });
  };

  $scope.getChoresList = function() {
    ChoresFactory.getChoresList(_homeid).then( function(filteredChoresArray) {
      $scope.chores = filteredChoresArray;
    });
  };

  $scope.completedTask =function(itemId) {
    ChoresFactory.getSingleChoreItem(itemId).then( function(choreObj) {
      console.log(choreObj)
      choreObj.completed = true;
      ChoresFactory.patchChoreItem(itemId, choreObj).then( function() {
        $scope.getChoresList();
      })
    })
  };

  $scope.deleteItem = function(itemId) {
    ChoresFactory.deleteChoreItem(itemId).then( function(choreObj) {
      console.log(choreObj);
      $scope.getChoresList();

    })
  };

});
