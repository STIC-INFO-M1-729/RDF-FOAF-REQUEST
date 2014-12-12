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
		},
		postQuerycomplexe : function(searchData) {
			return $http.post('/deck/' + searchData);
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('searchController', ['$scope','$http','Searchs',
			 function($scope, $http, Searchs) {

	Searchs.get()
		.success(function(data) {
			$scope.filtreSearchs = data;
	});

	$scope.goRestSearch = function(search){
		console.log('Listing Search Complexe');

		console.log(search.person.value);
		Searchs.postQuerycomplexe(search.person.value);
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
