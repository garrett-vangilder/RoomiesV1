app.controller("ChoresViewCtrl", function($scope, $window, ChoresFactory,HomeFactory, AuthFactory) {
  let _homeid = HomeFactory.getHouseid();
  let _uid = AuthFactory.getUid();

  $scope.newChoreItem = {
    "task": "",
    "dueDate": "",
    "assignedTo": "",
    "uid": _uid,
    "houseId": _homeid,
    "completed": false,
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
      // console.log("chores", chores);
      // $scope.completedList = ChoresFactory.filterchoresList(filteredChoresArray, 'completed', true);
      // console.log('completed list', $scope.completedList);
      // $scope.choresList = GroceryFactory.filterchoresList(filteredChoresArray, 'completed', false)
    });
  };

  $scope.fakeChores = [
    {
      task: "Clean Cat Poop",
      dueDate: "Daily",
      assignedTo: "Garrett"
    },
    {
      task: "Do Dishes",
      dueDate: "Bi-daily",
      assignedTo: "Dejan"
    },
    {
      task: "Cut the Grass",
      dueDate: "Weekly",
      assignedTo: "Cody"
    }
  ]
});
