var app = angular.module('popApp', []); //'ngRoute', 'authModule', 'userModule', 'deckModule', 'contactModule'

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html'
        }).
        /*when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'AuthenticationCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'userController'
        }).
        when('/decks', {
            templateUrl: 'partials/deck_list.html',
            controller: 'deckListController',
            access: { requiredAuthentication: true }
        }).
        when('/deck/:deckId', {
            templateUrl: 'partials/deck.html',
            controller: 'deckController',
            access: { requiredAuthentication: true }
        }).
        when('/admin', {
            templateUrl: 'partials/admin_user.html',
            controller : 'userController',
            access: { requiredAuthentication: true }
        }).
        when('/contacts', {
            templateUrl: 'partials/contacts.html',
            controller : 'contactController',
            access: { requiredAuthentication: true }
        }).*/
        otherwise({
            redirectTo: '/home'
        });
}]);

/*app.run(function($rootScope, $location, $window, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute !== null
            && nextRoute.access !== null
            && nextRoute.access !== undefined
            && nextRoute.access.requiredAuthentication
            && !AuthenticationService.isAuthenticated
            && !$window.sessionStorage.token) {

                $location.path("/login");
            }
    });
});*/

app.controller('menuCtrl', ['$scope', '$window', '$location', 'AuthenticationService', 
                function($scope, $window, $location, Auth){
    
    $scope.welcome = 'Pop rocks';
    //$scope.isAuthenticated = Auth.isAuthenticated();
    //$scope.adminUser = Auth.is_admin();

    /*$scope.$on("auth_status", function (event, args) {
        $scope.isAuthenticated = args.value;
        $scope.adminUser = Auth.is_admin();
        $scope.update_welcome();
    });

    $scope.logout = function () {
        delete $window.sessionStorage.token;
        $scope.isAuthenticated = Auth.isAuthenticated();

        $scope.$root.$broadcast("auth_status", {value: false});
        $location.path("/");
    };

    $scope.update_welcome = function() {
        if( $scope.isAuthenticated )
            $scope.welcome = "Aloha " + Auth.get_user_profile().name;
        else
            $scope.welcome = 'Welcome !';
    };
    $scope.update_welcome();*/
}]);


//this is used to parse the profile
/*function url_base64_decode(str) {
  var output = str.replace('-', '+').replace('_', '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw 'Illegal base64url string!';
  }
  return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
}*/

