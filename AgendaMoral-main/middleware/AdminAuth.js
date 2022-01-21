const authSecret = 'gabi&&jose&&lucas' // ver por que ele não está lendo do arquivo .env
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const authToken = req.headers['authorization']

    if (authToken) {
        const bearer = authToken.split(' ')
        const token = bearer[1]

        let decoded = jwt.verify(token, authSecret)
        console.log(decoded)
        next()
    } else {
        res.status(403).send('Você não é autenticado.')
    }

}