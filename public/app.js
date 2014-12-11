var celineMod = angular.module('celineMod', []);

function mainController($scope, $http) {

		$http.get('/recherche')
		  .success(function(data) {
		      console.log("je suis dans core.js côté client");
					$scope.valeur = "lancement";
		  })
		  .error(function(data) {
		      console.log('Error: ' + data);
		  });

	$scope.rechercher = function() {
		 console.log("Recherche en cours");
			$http.get('/recherche')
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
		  });
			$scope.valeur = "Bonjour";
	}

	$scope.jsonp = {};
	$scope.jsongen = {};
	$scope.jsongraph = {};
	$scope.valeur = "Je suis index.html";
}


