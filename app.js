var express = require('express')
var bodyParser = require('body-parser')
var gamedao = require('./dao/gamedatadao.js')
var userservice = require('./services/userservice.js');
var app = express()
var session = require('express-session')

app.use(session({
    secret: 'keyboard cat'
}))

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    }
}, resave = false, saveUninitialized = false))

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    if (req.session.user == undefined) {
        req.session.user = {
            'name': 'anonymous',
            'levelnumber': 0
        }
    }
    next()
})

var isLoggedIn = function(req, res, next) {
    if (req.session.user == undefined) {
        next()
    } else {
        res.status(401).send()
    }
}
app.get('/api/levels/:levelnumber', isLoggedIn, function(req, res) {
    req.session.user.levelnumber = levelnumber
    gamedao.getLevel(levelnumber).then(levelData => {
        res.send(levelData)
    })
});

app.get('/api/levels/initgame', function(req, res) {
    req.session.user.levelnumber = 0
    gamedao.getLevel(req.session.user.levelnumber).then(levelData => {
        res.send(levelData)
    })
})

app.post('/api/levels/:levelnumber/answer', function(req, res) {
    var userAnswer = req.body.answer
    gamedao.checkAnswer(req.params.levelnumber, userAnswer).then(response => {
        userservice.setLevelAnswer(req.session.user.name, req.params.levelnumber, response);
        console.log('returning answer: ', response)
        res.send(response)
    })
})

app.post('/api/user', function(req, res) {
    req.session.user.name = req.body.username
})

app.get('/api/nextlevel', function(req, res) {
    req.session.user.levelnumber = req.session.user.levelnumber + 1;
    gamedao.getLevel(req.session.user.levelnumber).then(levelData => {
        console.log('returning level: ' + req.session.user.levelnumber + " : " + levelData.title);
        res.send(levelData);
    });
})

app.listen(3000, function() {
    console.log('Service listening on port 3000!!!!!')
})