const jwt = require("jsonwebtoken");
const {jwtSecretKey} = require ('../server/db');

module.exports = function(req,res, next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg: 'No token, authorization failed'});

    }
    try {
        const decode = jwt.verify(token, jwtSecretKey);
        req.authentication = decode.authentication;
        next();
    } catch(er){
        res.status(401).json({msg: 'Token is verified'})
    }                                                   
} 