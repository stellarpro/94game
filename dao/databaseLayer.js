var mongoose = require('mongoose');
var db = mongoose.connection;

let connectToDb = function() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			db.on('error', function() {
				console.error.bind(console, 'connection error:')
			});

			db.once('open', function() {
				resolve(db);
			})

			mongoose.connect('mongodb://localhost:27017/94games');
		}, 2000)
	})
}

module.exports.connectionToDb = connectToDb()