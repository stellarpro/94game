var gameLevels = {
    levels: [{
        levelNo: 0,
        title: "Vegetables",
        solutions: [{
            name: "carrot",
            percent: 25
        }, {
            name: "spinach",
            percent: 25
        }, {
            name: "potato",
            percent: 20
        }, {
            name: "tomato",
            percent: 25
        }, {
            name: "pumpkin",
            percent: 96
        }]
    }, {
        levelNo: 1,
        title: "Planets",
        solutions: [{
            name: "earth",
            percent: 25
        }, {
            name: "jupiter",
            percent: 25
        }, {
            name: "saturn",
            percent: 20
        }, {
            name: "mars",
            percent: 25
        }, {
            name: "pluto",
            percent: 96
        }]
    }]
}
module.exports.gameLevels = function(levelNumber) {
	return new Promise((resolve, reject)=> {
		setTimeout(()=>{
			if (levelNumber < gameLevels.levels.length) {
				var levelDetails = {
					levelTitle: gameLevels.levels[levelNumber].title,
					isLastLevel: levelNumber == gameLevels.levels.length - 1,
					currentLevel: levelNumber
				}
				console.log('returning level from service ' + levelDetails + " : " + levelNumber);
				resolve(levelDetails);
			} else {
				resolve(-1)
			}
		}, 10)
	})

}
module.exports.checkAnswer = function(levelNumber, userAnswer) {
    console.log("trying to find answer " + levelNumber + " : " + userAnswer);
    var solutions = gameLevels.levels[levelNumber].solutions.filter(sol => sol.name === userAnswer);
    if (solutions.length == 1) {
        return {
            itemName: userAnswer,
            percent: solutions[0].percent
        }
    } else {
        return false;
    }
}