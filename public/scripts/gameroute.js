var app = angular.module('welcome', ['ngRoute', 'chart.js']);

app.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'login.html',
			controller: 'loginCtrl'
		}).when('/game', {
			templateUrl: 'game.html',
			controller: 'gameCtrl'
		})
		.when('/about', {
			template: '<h1>Games by Capgemini</h1>'
		})
		.when('/winning', {
			templateUrl: 'winning.html'
		})
		.otherwise({
			redirectTo: '/'
		})
})

app.controller('mainController', function() {
	})