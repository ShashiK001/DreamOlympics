const db = require('./dbConnection');
const jwt = require('jsonwebtoken');

async function validateUser(userID, userPassword) {
    try {
        const loginQuery = `SELECT * FROM logindata WHERE userID = ? AND userPassword = ?`;
        const values = [userID, userPassword];

        const [rows] = await db.query(loginQuery, values);
        
        if (rows.length === 1) {
            const token = jwt.sign({ userID }, 'secretkey', { expiresIn: '30m' });
            return { token };
        } else {
            throw new Error('Invalid Credential');
        }
    } catch (err) {
        console.error('error in Logging:', err.message);
        throw new Error('Internal Server Error');
    }
}

module.exports = validateUser;
