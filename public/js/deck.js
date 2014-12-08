var decksModule = angular.module('decksModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Decks', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/decks');
		},
		getQuery : function(searchData) {
			return $http.get('/deck/search/' + searchData);
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('decksController', ['$scope','$http','Decks',
			 function($scope, $http, Decks) {

	$scope.dataReturn = {};

	Decks.get()
		.success(function(data) {
	});

	$scope.searchQuery = function(){

		Decks.get()
		.success(function(data) {
		});

		console.log('Search value in dbPedia');
		Decks.getQuery($scope.formData.valQuery)
			.success(function(data) {
				$scope.dataReturn = data;
				//$scope.resultJsonReq = data;
			});

	};
}]);