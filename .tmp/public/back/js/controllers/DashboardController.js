angular.module('DemoOrangeDH').controller('DashboardController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
  //
  $scope.labels_api = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series_api= ['Form filling', 'check id'];
  $scope.data_api = [
    [20, 10, 44, 10, 0, 6, 10],
    [12, 35, 40, 19, 15, 27, 10]
  ];
  //
  $scope.labels_scope = ["OPENID", "offline", "check_id"];
  $scope.data_scope = [300, 500, 100];
  $scope.colours=["#E87E04","#3598DC","#26C281","#E08283","#F3C200","#9B59B6"];
  $scope.users=[];
  $scope.users_length=0;
  $http({
    method:'GET',
    url:'/user'
  }).then(function (response) {
    console.log(response.data);
    $scope.users=response.data;
    $scope.users_length=response.data.length;
  },function (error) {
    console.log(error);
  });
});
