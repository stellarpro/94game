var express = require('express')
var bodyParser = require('body-parser')
var gamedao = require('./dao/gamedatadao.js')
var userservice = require('./services/userservice.js');

var app = express()
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

app.use(session({
    store: new MongoStore({
        url: 'mongodb://localhost:27017/94games'
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

app.use(express.static('public'))
app.use(bodyParser.json())

require('./routes')(app)


app.listen(3000, function() {
    console.log('Service listening on port 3000!!!!!')
})