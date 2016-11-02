userdao = require('../dao/userdatadao')

module.exports.getuser = function(req, res) {
	userdao.getUser(req.params.username)
	.then(user => {
		if(user.lengh == 1){
			res.session.user = user
			res.send(user)
		} else {
			res.status(401).send()
		}
		
	}).catch(res.status(401).send())
}

module.exports.createUser = function(req, res) {
	userdao.saveUser(req.params.username, 0)
	.then(newuser => {
		console.log('got user ', user)
		res.session.user = newuser
		console.log('user settt')
		res.send(newuser)
	})
	.catch(res.status(500).send())

	res.send()
}