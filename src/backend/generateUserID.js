const db = require('./dbConnection');

async function generateUserID() {
    try {
        const [rows] = await db.query('SELECT userID FROM logindata ORDER BY userID DESC LIMIT 1');
        if (rows.length === 0) {
            return 'E101'; // Start from T101 if no users exist
        }
        const latestUserID = rows[0].userID;
        const numericPart = parseInt(latestUserID.slice(1));
        const nextUserID = 'E' + (numericPart + 1);
        return nextUserID;
    } catch (err) {
        throw new Error('Error generating user ID: ' + err.message);
    }
}

module.exports = generateUserID;
