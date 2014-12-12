var decksModule = angular.module('decksModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Decks', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/decks');
		},
		getQuerySoft : function(searchData) {
			return $http.get('/deck/search/' + searchData);
		},
		getQueryFull : function(searchName){
			return $http.get('/deck/search/')
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('decksController', ['$scope','$http','Decks',
			 function($scope, $http, Decks) {

	$scope.dataReturn = {};

	Decks.get()
		.success(function(data) {

			$scope.requests = data;
	});

	//$scope.searchQuery = function(){

		//First search for one person
		/*console.log('First Search like name');
		Decks.getQuerySoft($scope.formData.valQuery)
			.success(function(data) {

				$scope.firstSearch = data;

			});

		};
		//Put new blank value for input search
		//$scope.formData.valQuery = "";

		//After select a person , search object on relation with this person
		console.log('Search value in dbPedia');
		Decks.getQueryFull($scope.formData.valQuery)
			.success(function(data) {

				$scope.lastSearch = data;

			});*/
}]);