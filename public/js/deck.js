var decksModule = angular.module('decksModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Decks', ['$http',function($http) {
	return {
		getQuerySoft : function(searchData) {
			return $http.get('/deck/search/' + searchData);
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('decksController', ['$scope','$http','Decks','$location','$rootScope',
			 function($scope, $http, Decks, $location, $rootScope) {
	//On remplace le champs de recherche par la valeur du $rootScope.searchLabel
	$scope.somePlaceholder = $rootScope.searchLabel;
}]);