
/* DemoOrange App */
var DemoOrange = angular.module("DemoOrange", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
  "satellizer"
]);
/* Configure AngularJS*/
DemoOrange.config(['$ocLazyLoadProvider','$authProvider', function($ocLazyLoadProvider, $authProvider) {
    $ocLazyLoadProvider.config({
    });
  $authProvider.oauth2({
    name: 'orange',
    clientId:'TmAj4uJ1omBKZGE8MuBZaMPjjCrGfUBd',
    url: 'auth/orange',
    authorizationEndpoint: 'https://api.orange.com/openidconnect/fr/v1/authorize',
    redirectUri: 'http://checkandgo-orangegroup.rhcloud.com/auth/orange',
    requiredUrlParams: ['scope'],
    optionalUrlParams: ['display', 'state'],
    scope: ['offline_access','profile','address','phone','email'],
    scopePrefix: 'openid',
    scopeDelimiter: ' ',
    display: 'popup',
    oauthType: '2.0',
    popupOptions: {width: 1000, height: 700},
    state: function () {
      var rand = Math.random().toString(36).substr(2);
      return encodeURIComponent(rand);
    }
  });
}]);

/* Setup global settings */
DemoOrange.factory('settings', ['$rootScope', function($rootScope) {
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout3'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
DemoOrange.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
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
DemoOrange.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
DemoOrange.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);


/* Setup Layout Part - Sidebar */
DemoOrange.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);


/* Setup Layout Part - Footer */
DemoOrange.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
DemoOrange.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/");

    $stateProvider
        // Dashboard Main view
        .state('identity', {
            url: "/",
            templateUrl: "views/identity.html",
            data: {pageTitle: 'Check and GO API'},
            controller: "IdentityController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'DemoOrange',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            '../assets/global/plugins/morris/morris.css',
                            '../assets/global/plugins/morris/morris.min.js',
                            '../assets/global/plugins/morris/raphael-min.js',
                            '../assets/global/plugins/jquery.sparkline.min.js',
                            '../assets/pages/scripts/dashboard.min.js',
                            'js/controllers/IdentityController.js'
                        ]
                    });
                }]
            }
        })

}]);
/* Init global settings and run the app */
DemoOrange.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);
