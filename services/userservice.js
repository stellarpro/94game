var userLevels = [];

module.exports.userLevels = function(userName){
	return userLevels[userName];
}

module.exports.setLevelAnswer = function(userName, levelNumber, levelAnswer){
	if(!userLevels[userName]){
		userLevels[userName] = {};
	}

	if(!userLevels[userName][levelNumber]){
		userLevels[userName][levelNumber] = [];
	}

	userLevels[userName][levelNumber].push(levelAnswer);
}