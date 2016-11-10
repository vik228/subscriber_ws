quantinsti_assignment.controller('homeController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

  $scope.executionOrders = [];
  $scope.show = [];
  $scope.show_all = false;
  $scope.total_entries = 0;
  $scope.successCallback = function(response) {
    $scope.executionOrders = response.data.message;
    $scope.total_entries = $scope.executionOrders.length;
    for (var i = 0; i < $scope.executionOrders.length; i++) {
      if (!$scope.show[i])
        $scope.show[i] = $scope.show_all;

    }
  }
  $scope.failureCallback = function(response) {
    console.log(response.data.errors);
  }
  $scope.init = function(is_init) {
    if (!is_init) {
      $scope.show_all = true;
    }
    var httpPromise = $http.get('/execution_order');
    httpPromise.then($scope.successCallback, $scope.failureCallback);
  }
  $scope.handleClick = function(position) {
    $scope.show[position] = true

  }
  $interval(function() {
    $scope.init(true)
  }, 5000);

}]);
