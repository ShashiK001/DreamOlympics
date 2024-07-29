const db = require('./dbConnection');
const generateUserID = require('./generateUserID');

async function signup(req, res) {
    const { userName, userEmail, userPassword, contactNumber } = req.body;

    if (!userName || !userEmail || !userPassword || !contactNumber) {
        return res.status(400).json({ error: 'userName, userEmail, userPassword and contactNumber are required' });
    }
    try{
        let verified=false;
        const otp=Math.floor(1000 + Math.random() * 9000);
        const expiresIn = 5 * 60 * 1000; // 30 minutes in milliseconds
        const expiryDate = new Date(Date.now() + expiresIn);
        const expiryTime = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}-${expiryDate.getDate().toString().padStart(2, '0')} ${expiryDate.getHours().toString().padStart(2, '0')}:${expiryDate.getMinutes().toString().padStart(2, '0')}:${expiryDate.getSeconds().toString().padStart(2, '0')}`;
        const sql = 'INSERT INTO tempusers (userName, userEmail, userPassword, contactNumber, verified, otp, expiryTime) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [userName, userEmail, userPassword, contactNumber, verified, otp, expiryTime];
        await db.query(sql, values);
        console.log('Data Saved as Temperory User');
        res.status(200).json({ message: 'Data Saved as Temperory User',otp });

    }catch(err){
        console.error("Error in generating OTP:", err);
                return res.status(500).json({ message: 'Internal Server Error' });

    }
}
module.exports= {signup};