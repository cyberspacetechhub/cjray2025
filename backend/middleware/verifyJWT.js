const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    // console.log(token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded.email;
            req.roles = decoded.roles;
            //console.log(req.user, req.roles)
            next();
            // 
        }
    );
}

module.exports = verifyJWT;