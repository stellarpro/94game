module.exports.getLevel = function(req, res) {
	req.session.user.levelnumber = req.params.levelnumber
	gamedao.getLevel(levelnumber).then(levelData => {
		res.send(levelData)
	})
}

module.exports.initGame = function(req, res) {
	req.session.user.levelnumber = 0
	gamedao.getLevel(req.session.user.levelnumber).then(levelData => {
		res.send(levelData)
	})
}

module.exports.checkAnswer = function(req, res) {
	var userAnswer = req.body.answer
	gamedao.checkAnswer(req.params.levelnumber, userAnswer).then(response => {
		userservice.setLevelAnswer(req.session.user.name, req.params.levelnumber, response);
		console.log('returning answer: ', response)
		res.send(response)
	})
}

module.exports.nextLevel = function(req, res) {
	req.session.user.levelnumber = req.session.user.levelnumber + 1;
	gamedao.getLevel(req.session.user.levelnumber).then(levelData => {
		console.log('returning level: ' + req.session.user.levelnumber + " : " + levelData.title);
		res.send(levelData);
	});
}