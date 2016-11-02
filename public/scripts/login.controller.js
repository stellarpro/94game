app.controller('loginCtrl', function($scope, $location, LoginService) {

	$scope.username = "";

	$scope.login = function() {
		var isLoggedIn = LoginService.login($scope.username)

		if(isLoggedIn){
			$location.redirect('/game')
		}
	}

})