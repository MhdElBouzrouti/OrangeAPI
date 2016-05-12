angular.module('DemoOrange').controller('IdentityController', function($rootScope, $scope, $http, $timeout,$auth) {
    $scope.$on('$viewContentLoaded', function() {
        // initialize core components
        App.initAjax();
    });
    $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
    };
  $scope.isAuthenticated=function () {
    return $auth.isAuthenticated();
  };

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    $rootScope.settings.layout.pageSidebarClosed = false;
});
