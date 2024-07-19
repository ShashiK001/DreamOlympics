const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';

function getTokenUserID(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userID;
}

module.exports = getTokenUserID;
