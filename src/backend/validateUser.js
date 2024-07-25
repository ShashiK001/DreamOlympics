const db = require('./dbConnection');
const jwt = require('jsonwebtoken');

async function validateUser(req,res,next) {
    const {userID,userPassword}=req.body;

    try {
        console.log("Validating User");
        const loginQuery = `SELECT * FROM logindata WHERE userID = ? AND userPassword = ?`;
        const values = [userID, userPassword];

        const [rows] = await db.query(loginQuery, values);
        
        if (rows.length === 1) {
            const token = jwt.sign({ userID }, 'secretkey', { expiresIn: '30m' });
            req.token=token;
            next();
        } else {
            res.status(401).json({ error: 'Invalid Credential' });
        }
    } catch (err) {
        console.error('error in Logging:', err.message);
        throw new Error('Internal Server Error');
    }
}

module.exports = validateUser;
