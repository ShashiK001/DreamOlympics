const db = require('../backend/dbConnection');
const getTokenUserID = require('../backend/getTokenUserID');

async function saveUserDetails(req, res) {
    const { Name, Contact, Address, Amount } = req.body;

    if (!Name || !Contact || !Address || !Amount) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const authHeader = req.headers.authorization;
    let userID = "";
      if (authHeader) {
            const reqToken = authHeader.split(' ')[1];
            userID = getTokenUserID(reqToken);
            emailSQL='SELECT userEmail FROM logindata WHERE userID = ?;';
            userEmail=await db.query(emailSQL, userID);
            console.log("userEmail:",userEmail);

            console.log("SQL Insertion Started");

                const sql = 'INSERT INTO userdetails (userID, Name, userEmail, Contact, Address, Amount) VALUES (?, ?, ?, ?, ?)';
                const values = [userID, Name, userEmail, Contact, Address, Amount];

                await db.query(sql, values);
                console.log('Data inserted successfully');
                return res.status(200).json({ message: 'User details saved successfully' });
        }
    } 
module.exports = { saveUserDetails };
