const jwt = require('jsonwebtoken');

module.exports = {
    authLogin: (req, res, next) => {
        if (!req.headers.token) {
            res.status(400).json({
                message: 'Authentication needed'
            })
        }
        try {
            jwt.verify(req.headers.token, process.env.SECRET_KEY, function (err, decoded) {
                req.decoded = decoded;
                next()
            })
        } catch (e) {
            console.log(e)
            res.status(500).json({
                err: e
            });
        }
    }
}