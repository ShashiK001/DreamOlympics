const db = require('./dbConnection');
const generateUserID=require("./generateUserID");

async function signup(req, res) {
    const { userName, userEmail, userPassword, contactNumber } = req.body;

    if (!userName || !userEmail || !userPassword || contactNumber) {
        return res.status(400).json({ error: 'userName, userEmail, userPassword and contactNumber are required' });
    }
    try{
        let verified=false;
        const otp=Math.floor(1000 + Math.random() * 9000);
        const expiresIn = 30 * 60 * 1000;
        const expiryTime = Date.now() + expiresIn;
        const sql = 'INSERT INTO tempusers (userName, userEmail, userPassword, contactNumber, verified, otp, expiryTime) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [userName, userEmail, userPassword, contactNumber, verified, otp, expiryTime];
        await db.query(sql, values);
        console.log('Data Saved as Temperory User');
        res.status(200).json({ message: 'Data Saved as Temperory User' });

    }catch(err){

    }
}