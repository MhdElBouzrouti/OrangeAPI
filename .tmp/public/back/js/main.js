/* DemoOrange App */
var DemoOrangeDH = angular.module("DemoOrangeDH", [
  "ui.router",
  "ui.bootstrap",
  "oc.lazyLoad",
  "ngSanitize",
  "chart.js"
]);
/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
DemoOrangeDH.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    // global configs go here
  });
}]);
/* Setup global settings */
DemoOrangeDH.factory('settings', ['$rootScope', function ($rootScope) {
  // supported languages
  var settings = {
    layout: {
      pageSidebarClosed: false, // sidebar menu state
      pageContentWhite: true, // set page content layout
      pageBodySolid: false, // solid body color state
      pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
    },
    assetsPath: '../assets',
    globalPath: '../assets/global',
    layoutPath: '../assets/layouts/layout2'
  };

  $rootScope.settings = settings;

  return settings;
}]);

/* Setup App Main Controller */
DemoOrangeDH.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.$on('$viewContentLoaded', function () {
    App.initComponents(); // init core components
    //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
  });
}]);

/***
 Layout Partials.
 By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
 initialization can be disabled and Layout.init() should be called on page load complete as explained above.
 ***/

/* Setup Layout Part - Header */
DemoOrangeDH.controller('HeaderController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initHeader(); // init header
  });
}]);

/* Setup Layout Part - Sidebar */
DemoOrangeDH.controller('SidebarController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initSidebar(); // init sidebar
  });
}]);
/* Setup Layout Part - Footer */
DemoOrangeDH.controller('FooterController', ['$scope', function ($scope) {
  $scope.$on('$includeContentLoaded', function () {
    Layout.initFooter(); // init footer
  });
}]);

/* Setup Rounting For All Pages */
DemoOrangeDH.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  // Redirect any unmatched url
  $urlRouterProvider.otherwise("/");

  $stateProvider
  // Dashboard
    .state('dashboard', {
      url: "/",
      templateUrl: "views/dashboard.html",
      data: {pageTitle: 'Admin Dashboard'},
      controller: "DashboardController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'DemoOrangeDH',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',
              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/DashboardController.js'
            ]
          });
        }]
      }
    })
    .state('oidc', {
      url: "/oidc",
      templateUrl: "views/oidc.html",
      data: {pageTitle: 'Oidc Dashboard'},
      controller: "OidcController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'DemoOrangeDH',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',

              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/OidcController.js'
            ]
          });
        }]
      }
    })
    .state('testing', {
      url: "/testing",
      templateUrl: "views/testing.html",
      data: {pageTitle: 'Testing API'},
      controller: "TestingController",
      resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
          return $ocLazyLoad.load({
            name: 'DemoOrangeDH',
            insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '../assets/global/plugins/morris/morris.css',
              '../assets/global/plugins/morris/morris.min.js',
              '../assets/global/plugins/morris/raphael-min.js',
              '../assets/global/plugins/jquery.sparkline.min.js',

              '../assets/pages/scripts/dashboard.min.js',
              'js/controllers/TestingController.js'
            ]
          });
        }]
      }
    })
}]);

/* Init global settings and run the app */
DemoOrangeDH.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
  $rootScope.$state = $state; // state to be accessed from view
  $rootScope.$settings = settings; // state to be accessed from view
}]);
