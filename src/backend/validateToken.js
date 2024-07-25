const jwt = require('jsonwebtoken');
const secretKey = 'secretkey'; 
const getTokenUserID = require('../backend/getTokenUserID');

function validateToken(req, res, next) {
    console.log('validateToken Middleware Called');
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const reqToken = authHeader.split(' ')[1];
        console.log('Extracted Token:', reqToken);

        const userID = getTokenUserID(reqToken);
        console.log('Extracted User ID:', userID);

        const decoded = jwt.verify(reqToken, secretKey);
        if (decoded.userID === userID) {
            next();  // Token is valid, proceed to next middleware/route handler
        } else {
            res.status(401).json({ message: 'Invalid Token' });
        }
    } catch (err) {
        res.status(401).json({ error: 'Invalid Token' });
    }
}

module.exports = validateToken;
