var security = require('./security')
var gamecontroller = require('./web/game.controller')
var userController = require('./web/user.controller')

module.exports = function(app) {

    app.get('/api/levels/:levelnumber', security.isLoggedIn, gamecontroller.getLevel);

    app.get('/api/levels/initgame', security.isLoggedIn, gamecontroller.initGame)

    app.post('/api/levels/:levelnumber/answer', security.isLoggedIn, gamecontroller.checkAnswer)

    app.get('/api/levels/nextlevel', security.isLoggedIn, gamecontroller.nextLevel)

    // -------- user management ---------------------

    app.get('/api/user/:username/login', userController.getuser)

    app.post('/api/user/:username/create', userController.createUser)
}