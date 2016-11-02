var mongoose = require('mongoose');
var connection = require('./databaseLayer.js')

var userSchema = mongoose.Schema({
	name: String,
	level: Number
});

userSchema.methods.details = function() {
	console.log('name: ', this.name, 'level:', this.level);
}

var User = mongoose.model('User', userSchema);

module.exports.getUser = function(username) {

	return new Promise((resolve, reject) => {
		User.find({name: username}, function(err, user){
			if(err){
				console.log('user not found ', username);
				resolve(false)
			} else {
				resolve(user)
			}
		})
	})
}


module.exports.saveUser = function(username, userlevel) {
	return new Promise((resolve, reject) => {
		
		var newUser = new User({name: username, level: userlevel})	
		newUser.save(function(err, newUser){
			if(err){
				console.log('unable to save user ', username, userlevel)
				resolve(false)
			} else {
				resolve(newUser)
			}
		})
	})
}