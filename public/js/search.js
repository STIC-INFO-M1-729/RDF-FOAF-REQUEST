var searchModule = angular.module('searchModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Searchs', ['$http',function($http) {
	var cors_headers = {
				'Access-Control-Allow-Origin' : '*',
				'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT'
			};
	return {
		get : function() {
			return $http.get('/search');
		},
		getQuerySoft : function(searchData) {
			return $http.get('/search/' + searchData);
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('searchController', ['$scope','$http','Searchs','$location','$rootScope',
			 function($scope, $http, Searchs, $location, $rootScope) {

	Searchs.get()
		.success(function(data) {
			$scope.filtreSearchs = data;
	});

	$scope.goRestSearch = function(search){

		//console.log("Valeur rechercher sLabel : " + search.slabel.value);
		$rootScope.searchLabel = search.slabel.value;
		//console.log($rootScope.searchLabel);
		//console.log('Listing Search Complexe');
		//console.log(search.person.value);
		//console.log(search.slabel.value);

		$location.path( "/decks");
	};


	$scope.goSearch = function(){

		//First search for one person
		console.log('First Search like name');
		Searchs.getQuerySoft($scope.formData.valSearch)
			.success(function(data) {
				//console.log(data);
				//console.log(data[0].person.value);
				//Modify
				$scope.lsSearch = data;
				//console.log($scope.lsSearch);
			});
		};
}]);