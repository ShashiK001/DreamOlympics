const db = require('./dbConnection');
const generateUserID=require("./generateUserID");

async function signup(req, res) {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({ error: 'userEmail and userPassword are required' });
    }

    try {
        const userID = await generateUserID();
        const sql = 'INSERT INTO logindata (userID, userEmail, userPassword) VALUES (?, ?, ?)';
        const values = [userID, userEmail, userPassword];

        await db.query(sql, values);
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'User details saved successfully' });
    } catch (err) {
        console.error('Error in inserting data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { signup };
