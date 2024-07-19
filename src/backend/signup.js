const db = require('./dbConnection');

async function signup(req, res) {
    const { userID, userPassword } = req.body;

    if (!userID || !userPassword) {
        return res.status(400).json({ error: 'userID and userPassword are required' });
    }

    try {
        const sql = 'INSERT INTO logindata (userID, userPassword) VALUES (?, ?)';
        const values = [userID, userPassword];

        await db.query(sql, values);
        console.log('Data inserted successfully');
        res.status(200).json({ message: 'User details saved successfully' });
    } catch (err) {
        console.error('Error in inserting data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { signup };
