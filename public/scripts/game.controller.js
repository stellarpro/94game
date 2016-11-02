app.controller('gameCtrl', function($scope, $location, GameDataService, GameStatsService) {
	$scope.WIN_THRESHOLD = 94;
	$scope.total = 0;
	$scope.answers = [];
	$scope.chartdata = [$scope.WIN_THRESHOLD];
	$scope.chartlabels = ["none"];
	$scope.currentLevel = 0;
	$scope.userStats = "test";

	$scope.resetValues = function() {
		$scope.total = 0;
		$scope.answers = [];
		$scope.chartdata = [$scope.WIN_THRESHOLD];
		$scope.chartlabels = ["none"];
		$scope.gameMessage = "";
	}

	$scope.initLevel = function() {

		$scope.resetValues();

		console.log('getting level ' + $scope.currentLevel);
		GameDataService.initGame().then(function(level) {
				console.log("recieved level " + level);
				$scope.levelTitle = level.levelTitle;
				$scope.currentLevel = level.currentLevel;
			})
			.catch(console.log('No level retrived'));
	}
	//return $scope.gameData.levels[$scope.currentLevel]		

	$scope.initLevel();


	$scope.handleAnswer = function(keyEvent) {
		$scope.gameMessage = "";
		if (keyEvent.which === 13) {
			$scope.checkAnswer();
		}
	}

	$scope.checkAnswer = function() {

		GameDataService.checkAnswer($scope.currentLevel, $scope.itemName).then(function(isCorrect) {

			if (isCorrect != false) {
				$scope.answers.push({
					name: isCorrect.itemName,
					percent: isCorrect.percent
				})

				$scope.updateStats();

				$scope.checkWin();

			} else {
				$scope.gameMessage = "Noop! Try again";
				$scope.itemName = "";
			}
		})
	}

	$scope.updateStats = function() {
		$scope.total = $scope.answers.reduce((a, b) => (a + b.percent), 0);

		$scope.chartlabels = $scope.answers.map(ans => ans.name);
		$scope.chartdata = $scope.answers.map(ans => ans.percent);
		if ($scope.total < $scope.WIN_THRESHOLD) {
			$scope.chartdata.push($scope.WIN_THRESHOLD - $scope.total);
			$scope.chartlabels.push("none");
		}
		$scope.itemName = "";
	}

	$scope.checkWin = function() {
		if ($scope.total >= $scope.WIN_THRESHOLD) {
			$scope.gameMessage = "You Win!";

		}
	}


	$scope.nextLevel = function() {
		GameStatsService.setLevelStats($scope.currentLevel, $scope.total, $scope.answers);
		$scope.currentLevel++;

		$scope.resetValues();

		console.log('getting level ' + $scope.currentLevel);
		GameDataService.getNextLevel().then(function(level) {
				console.log("recieved level " + level);
				$scope.levelTitle = level.levelTitle;
				$scope.currentLevel = level.currentLevel;
			})
			.catch(console.log('No level retrived'));
	}

	$scope.gameStats = function() {
		//GameStatsService.getLevelStats();
	}

})