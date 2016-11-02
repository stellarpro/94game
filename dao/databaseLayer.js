MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/94games'

let connectToDb = function() {
	return new Promise((resolve, reject)=> {
		setTimeout(()=>{
			MongoClient.connect(url, function(err, db){
				resolve(db)
			})
		}, 2000)
	})
}

module.exports.connectionToDb = connectToDb()