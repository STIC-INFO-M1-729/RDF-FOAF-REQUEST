var searchModule = angular.module('searchModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Searchs', ['$http',function($http) {
	var cors_headers = {
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'
			};
	return {
		getQuerySoft : function(searchData) {
			return $http.get('/search/' + searchData);
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('searchController', ['$scope','$http','Searchs','$location','$rootScope',
			 function($scope, $http, Searchs, $location, $rootScope) {

	$scope.goRestSearch = function(search){

		//On click on person label ,past slabel argument to decks
		$rootScope.searchLabel = search.slabel.value;
		$location.path( "/decks");
	};


	$scope.goSearch = function(){

		//First search for one person
		Searchs.getQuerySoft($scope.formData.valSearch)
			.success(function(data) {
				$scope.lsSearch = data;
			});
		};
}]);