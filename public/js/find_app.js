var app = angular.module('findApp', ['ngRoute','decksModule','searchModule','angular.filter','modalModule']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html'
        }).

        when('/decks', {
            templateUrl: 'partials/deck.html',
            controller: 'decksController'
        }).
        when('/deck/search/:search_id', {
            templateUrl: 'partials/deck.html',
            controller: 'decksController'
        }).
        when('/search', {
            templateUrl: 'partials/search.html',
            controller: 'searchController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);

app.run(function($rootScope) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute !== null
            && nextRoute.templateUrl == "partials/home.html" ) {
                $rootScope.searchLabel = "Search";
            }
    });
});

