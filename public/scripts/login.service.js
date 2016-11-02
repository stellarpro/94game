app.factory('LoginService', function($q, $http) {
	
	var createuser = function(username) {
		return $q(function(resolve, reject) {
			$http.post('/api/user/' + username + '/create').then(
				function(response) {
					console.log('user created and logged in ', username)
					resolve(true)
				}).catch(function(error) {
				console.log('unable to login or create user ', username)
				resolve(false);
			})
		})
	}

	return {
		loginuser: function(username) {
			return $q(function(resolve, reject) {
				$http.get('/api/user/' + username + '/login').then(
					function(response) {
						console.log('user logged in ', username)
						resolve(true)
					}).catch(function(error) {
					console.log('user isnt logged in, trying to log him in')
					createuser(username).then(function(response) {
						resolve(response)
					})
				})
			})
		}
	}
})