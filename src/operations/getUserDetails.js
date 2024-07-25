const db = require('../backend/dbConnection');
const getTokenUserID = require('../backend/getTokenUserID');
const validateToken = require('../backend/validateToken');

async function getUserDetails(req, res) {
    const authHeader = req.headers.authorization;

        try {
        const reqToken = authHeader.split(' ')[1];
        console.log('Extracted Token:', reqToken);

        const userID = getTokenUserID(reqToken);  
        console.log('Extracted User ID:', userID);

        console.log("Token is valid");

            const userdetailsQuery = 'SELECT * FROM userdetails WHERE userID = ?';
            console.log('Executing query:', userdetailsQuery, [userID]);
        if (validateToken(reqToken, userID)) {
            

            try {
          
                const [result] = await db.query(userdetailsQuery, [userID]);
                console.log('Query Result:', result);

                if (result.length === 1) {
                    return res.json(result[0]);
                } else {
                    return res.status(404).json({ message: 'User details not found' });
                }
            } catch (err) {
                console.error("Error executing user details query:", err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            console.log('Invalid token');
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error('Token Error:', error.message);
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { getUserDetails };
