var quantinsti_assignment = angular.module('quantinsti_assignment', ['ui.router', 'angular-loading-bar']);
console.log (quantinsti_assignment);
quantinsti_assignment.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  console.log ($stateProvider)
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('/home', {
      url: '/home',
      templateUrl: 'templates/index.html',
      controller:'homeController'
    })
}]);
