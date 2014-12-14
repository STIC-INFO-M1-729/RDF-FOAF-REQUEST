var decksModule = angular.module('decksModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Decks', ['$http', function ($http) {
        return {
            post: function(valQuery, valOptions) {
                return $http.post('/decks/searchInitial', {recherche: valQuery, options: valOptions});
            }
        };
    }]);

// inject the User service factory into our controller
decksModule.controller('decksController', ['$scope', '$http', 'Decks', '$location', '$rootScope',
    function ($scope, $http, Decks, $location, $rootScope) {

        //On remplace le champs de recherche par la valeur du $rootScope.searchLabel
        $scope.somePlaceholder = $rootScope.searchLabel;

        $scope.dataReturn = {};
        $scope.valeur = "Ouverture";
        $scope.jsonp = {};

        $scope.searchQuery = function () {
            $scope.valeur = $scope.formData;
            console.log($scope.valeur);
            //Appelle post avec les valeurs du formulaire
            //L'action à réaliser est définie dans app/routes/deck.js
            //app/routes/deck.js renvoie un json de type liste de triplets
            //produitToGenerique le transforme en json générique
            //d3_graphe fait appel à d3_formatteur pour le transformer en jsonGraph
            //puis d3_graphe affiche le graphe
            Decks.post($scope.formData.valQuery, $scope.formData.valOptions)
                    .success(function (data) {
                        $scope.jsonp = data;
                        var jsongen = produitToGenerique(data);
                        /*var d3_graphe = new D3_GrapheRepresentation();
                        d3_graphe.show(jsongen);*/
                        var d3_tree = new D3_NodeLinkTreeRepresentation();
                        d3_tree.show(jsongen);
                    });
        };

    }]);
