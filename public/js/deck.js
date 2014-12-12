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
	$scope.valeur = "Ouverture";
	$scope.jsonp = {};
	$scope.jsongen = {};

	Decks.get()
		.success(function(data) {
			console.log("je suis dans deck.js côté client, fonction get, avec data = ");
			console.log(data);
			$scope.requests = data;
	});

	$scope.searchQuery = function() {
		 console.log("Recherche en cours");
			console.log("Recherche ....");
			$scope.valeur = "Bonjour";
			console.log($scope.valeur);
			Decks.get()
				.success(function(data) {
					console.log("je suis dans deck.js côté client, fonction get, avec data = ");
					console.log(data);
					$scope.jsonp = data;
					$scope.jsongen = produitToGenerique(data);
					var d3_graphe = new D3_GrapheRepresentation();
					d3_graphe.show($scope.jsongen);
			});
			/*Decks.get()
				.success(function(data) {
					/*console.log("je suis dans deck.js côté client, fonction get, avec data = ");
					console.log(data);
					$scope.requests = data;
					$scope.valeur = "Bonjour";
			});*/
			/*$http.get('/recherche')
			.success(function(data) {
		      console.log("je suis dans core.js côté client");
					$scope.valeur = "Recherche effectuée";
					$scope.jsonp = data;
					$scope.jsongen = produitToGenerique(data);
					//$scope.jsongraph = generiqueToGraph($scope.jsongen);
					var d3_graphe = new D3_GrapheRepresentation();
					d3_graphe.show($scope.jsongen);
		  })
		  .error(function(data) {
		      console.log('Error: ' + data);
		  });*/
			//$scope.valeur = "Bonjour";
	}

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
