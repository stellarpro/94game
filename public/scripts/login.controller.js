app.controller('loginCtrl', function($scope, $location, LoginService) {

	$scope.username = "";

	$scope.login = function() {
		console.log('trying to login ', $scope.username)
		LoginService.loginuser($scope.username).then(function(loginId){
			if(isLoggedIn){
				$location.redirect('/game')
			} else {
				console.log('unable to login')
			}
		})

		
	}

})