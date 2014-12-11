<<<<<<< HEAD
var searchModule = angular.module('searchModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Searchs', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/searchs');
		},
		getQuerySoft : function(searchData) {
			return $http.get('/search/' + searchData);
		}
	};
}]);

	// inject the User service factory into our controller
decksModule.controller('searchController', ['$scope','$http','Searchs',
			 function($scope, $http, Searchs) {

	$scope.dataReturn = {};

	Searchs.get()
		.success(function(data) {

			$scope.filtreSearchs = data;
	});

	$scope.goSearch = function(){

		//First search for one person
		console.log('First Search like name');
		Searchs.getQuerySoft($scope.formData.valSearch)
			.success(function(data) {

				$scope.listeSearchs = data;

			});

		};
}]);/**
 * Created by zorg on 09/12/14.
=======
/**
 * Created by funflash on 10/12/14.
>>>>>>> d5c632389dd762591b7aceacbd48fa471ef6a117
 */
