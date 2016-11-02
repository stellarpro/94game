var chai = require('chai')
var sinon = require('sinon')
var expect = chai.expect
var spy = sinon.spy()
gamedata = require('./gamedataservice')


describe('Gamedata', function() {
    it('return data for provided level number', function(done) {
        //call the calculator
        var total = gamedata.gameLevels(0).then(levelData => {
                expect(levelData.levelTitle).to.equal("Vegetables", 'Level is incorrect')
                done()
            }).catch(done)
    })
})