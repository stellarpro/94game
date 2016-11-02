app.factory('GameDataService', function($q, $http) {

	return {
		initGame: function(level) {
			return $q(function(resolve, reject) {

				$http.get('/api/initgame').then(
					function(response) {
						console.log('Recieved level data ' + response.data);
						resolve(response.data)
					})
			})
		},
		getNextLevel: function(level) {
			return $q(function(resolve, reject) {

				$http.get('/api/nextlevel').then(
					function(response) {
						console.log('Recieved level data ' + response.data);
						resolve(response.data)
					})
			})
		},
		checkAnswer: function(level, userAnswer) {
			console.log('making call ');
			return $q(function(resolve, reject) {

				$http.post('/api/levels/' + level + '/answer', {answer: userAnswer}).then(
					function(response) {
						console.log('Recieved answer: ', response.data)
						resolve(response.data)
					})
			})
		}
	}
});