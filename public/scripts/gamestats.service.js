app.factory('GameStatsService', function($q) {

	var gameStats = [];

	return {
		setLevelStats: function(levelNo, playerPercents, playerAnswers) {
			return $q(function(resolve, reject) {
				gameStats.push({
					level: levelNo,
					percents: playerPercents,
					anwers: playerAnswers
				});
				resolve()
			})
		}

		// getLevelStats: function(){
		// 	return $q(function(resolve, reject) {
		// 		resolve(gameStats)
		// 	}
		// }
	}
});