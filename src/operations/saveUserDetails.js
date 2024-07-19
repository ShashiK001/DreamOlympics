const db = require('../backend/dbConnection');
const validateToken = require('../backend/validateToken');
const getTokenUserID = require('../backend/getTokenUserID');

async function saveUserDetails(req, res) {
    const { Name, Contact, Address, Amount } = req.body;

    if (!Name || !Contact || !Address || !Amount) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const authHeader = req.headers.authorization;
    let userID = "";

    try {
        if (authHeader) {
            const reqToken = authHeader.split(' ')[1];
            userID = getTokenUserID(reqToken);

            if (validateToken(reqToken, userID)) {
                console.log("Token is Valid");

                const sql = 'INSERT INTO userdetails (userID, Name, Contact, Address, Amount) VALUES (?, ?, ?, ?, ?)';
                const values = [userID, Name, Contact, Address, Amount];

                await db.query(sql, values);
                console.log('Data inserted successfully');
                return res.status(200).json({ message: 'User details saved successfully' });
            } else {
                console.log('Token is Invalid');
                return res.status(401).json({ message: 'Token is Invalid' });
            }
        } else {
            console.log('Kindly provide Token First');
            return res.status(401).json({ message: 'Kindly provide Token First' });
        }
    } catch (error) {
        console.error('Token Error:', error.message);
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { saveUserDetails };