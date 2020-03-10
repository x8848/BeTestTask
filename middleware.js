let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
    let token = req.header(config.token);
    if (token) {
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send('Token is not valid')
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send('Auth token is not supplied')
    }
};

module.exports = {
    checkToken: checkToken
}