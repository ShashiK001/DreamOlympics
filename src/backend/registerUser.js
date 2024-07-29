// signup.js
const db = require('./dbConnection');
const generateUserID = require("./generateUserID");

async function registerUser(userEmail, userPassword) {
    try {
        const userID = await generateUserID();
        const sql = 'INSERT INTO logindata (userID, userEmail, userPassword) VALUES (?, ?, ?)';
        const values = [userID, userEmail, userPassword];

        await db.query(sql, values);
        console.log('Data inserted successfully');
    } catch (err) {
        console.error('Error in inserting data:', err);
        throw err; // Re-throw the error to be caught in the calling function
    }
}

module.exports = registerUser;
