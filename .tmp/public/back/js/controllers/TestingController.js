angular.module('MetronicApp').controller('TestingController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  $http({
    method:'GET',
    url:'/user'
  }).then(function (response) {
    console.log(response.data);
    $scope.users=response.data;

  },function (error) {
    console.log(error);
  });
});
