var searchModule = angular.module('searchModule', ['modalModule']);

// service accessing the USER API of Pop
decksModule.factory('Searchs', ['$http',function($http) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 6166e8c1d1ccad2088fc5d1b4136066fe5a2d71c

