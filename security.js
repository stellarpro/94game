module.exports.isLoggedIn = function(req, res, next) {
    if (req.session.user != undefined) {
        next()
    } else {
        res.status(401).send()
    }
}
