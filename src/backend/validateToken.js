const jwt = require('jsonwebtoken');
const secretKey = 'secretkey'; 

function validateToken(token, userID) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userID === userID;
    } catch (err) {
        return false;
    }
}

module.exports = validateToken;
