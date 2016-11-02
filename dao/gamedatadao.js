var connection = require('./databaseLayer.js')

module.exports.getLevel = function(levelNumber) {
	return new Promise((resolve, reject) => {
		connection.connectionToDb.then(db => {
				db.collection('gamedata').findOne({
						levelNo: levelNumber
					})
					.then(levelDetails => {

						resolve({
							levelTitle: levelDetails.title,
							currentLevel: levelNumber
						})

					})
					.catch(reject)
			})
			.catch(reject)
	})
}

module.exports.checkAnswer = function(levelNumber, userAnswer) {
	console.log("trying to find answer " + levelNumber + " : " + userAnswer);
	return new Promise((resolve, reject) => {
		connection.connectionToDb.then(db => {
				db.collection('gamedata').findOne({
						levelNo: parseInt(levelNumber)
					})
					.then(levelDetails => {
						var solutions = levelDetails.solutions.filter(sol => sol.name === userAnswer);
						console.log("Found solutions ", solutions)
						if (solutions.length == 1) {
							console.log("returning solutions ", solutions[0])
							resolve({
								itemName: userAnswer,
								percent: solutions[0].percent
							})
						} else {
							resolve(false);
						}
					})
					.catch(reject)
			})
			.catch(reject)
	})
}