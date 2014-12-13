var decksModule = angular.module('decksModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Decks', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('/decks');
            },
            getQuerySoft: function (searchData) {
                return $http.get('/deck/search/' + searchData);
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
        $scope.jsongen = {};

        $scope.searchQuery = function () {
            console.log("Recherche en cours");
            console.log("Recherche ....");
            $scope.valeur = "Bonjour";
            console.log($scope.valeur);
            Decks.get()
                    .success(function (data) {
                        console.log("je suis dans deck.js côté client, fonction get, avec data = ");
                        console.log(data);
                        $scope.jsonp = data;
                        $scope.jsongen = produitToGenerique(data);
                        var d3_graphe = new D3_GrapheRepresentation();
                        d3_graphe.show($scope.jsongen);
                    });
        };

    }]);
