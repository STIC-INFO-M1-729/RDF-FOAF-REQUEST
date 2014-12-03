var userModule = angular.module('userModule', ['modalModule']);

// service accessing the USER API of Pop
userModule.factory('Users', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/users');
		},
		create : function(userData) {
			return $http.put('/user', userData);
		},
		post : function(id, userData) {
			return $http.post('/user/' + id, userData);
		},
		delete : function(id) {
			return $http.delete('/user/' + id);
		}
	};
}]);

	// inject the User service factory into our controller
userModule.controller('userController', ['$scope','$http','Users', 'modalService',
			 function($scope, $http, Users, modalService) {
	
	$scope.formData = {};
	$scope.loading = true;
	$scope.displayDeletePopup = false;
	$scope.userToDelete = null;
	$scope.showEditForm = false;

	// GET =====================================================================
	// when landing on the page, get all users and show them
	// use the service to get all the users
	Users.get() 
	.success(function(data) {
		$scope.users = data;
		$scope.loading = false;
	});

	$scope.editUser = function(user) {
		$scope.showEditForm = true;
		user.password = "";
		$scope.editedUser = user;
	};

	$scope.saveUser = function() {
		Users.post($scope.editedUser._id, $scope.editedUser)
			.success(function(data) {
				$scope.showEditForm = false;
				$scope.editedUser = null;
				$scope.loading = false;
			});
	};

	$scope.setAdmin = function(user) {
		$scope.loading = true;
		user.admin = true;
		Users.post(user._id, {admin: true})
			.success(function(data) {
				$scope.loading = false;
			});
	};

	$scope.unsetAdmin = function(user) {
		$scope.loading = true;
		user.admin = false;
		Users.post(user._id, {admin: false})
		.success(function(data) {
			$scope.loading = false;
		});
	};

	$scope.checkBeforeUnsetAdmin = function (user) {

	    var modalOptions = {
	        closeButtonText: 'Cancel',
	        actionButtonText: 'Un-Admin',
	        headerText: 'Un-Admin ' + user.name + '?',
	        bodyText: 'Are you sure you want to remove admin rights for this user?'
	    };

	    modalService.showModal({}, modalOptions).then(function (result) {
	        $scope.unsetAdmin(user);
	    });
	};




	// CREATE ==================================================================
	// when submitting the add form, send the user name to the node API
	$scope.createUser = function() {
		$scope.loading = true;

		// validate the formData to make sure that something is there
		// if form is empty, nothing will happen
		if ($scope.formData.name !== undefined) {

			// call the create function from our service (returns a promise object)
			Users.create($scope.formData)

				// if successful creation, call our get function to get all the new users
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; // clear the form so our user is ready to enter another
					$scope.users = data; // assign our new list of users
				});
		}
	};

	// DELETE ==================================================================
	// delete a user after checking it
	$scope.deleteUser = function(id) {
		$scope.loading = true;

		Users.delete(id)
			// if successful creation, call our get function to get all the new users
			.success(function(data) {
				$scope.loading = false;
				$scope.displayDeletePopup = false;
				$scope.users = data; // assign our new list of users
		});
	};

	$scope.showDeletePopup = function(newVal, user) {
		$scope.displayDeletePopup = newVal;
		$scope.userToDelete = user;
	};
}]);