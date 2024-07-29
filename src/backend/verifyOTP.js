const db = require('./dbConnection');
const generateUserID = require('./generateUserID');
const registerUser = require('./registerUser');
const deleteTempUser=require('./deleteTempUser');

async function verifyOTP(req, res) {
    const { contactNumber, otp } = req.body;
    const query = `SELECT otp, expiryTime FROM tempusers WHERE contactNumber = ?`;
    const [rows] = await db.query(query, [contactNumber]);

    if (rows.length === 0) {
        return res.status(404).json({ message: 'No user found with this contact number' });
    }

    const dbOTP = rows[0].otp;
    const expiryTime = rows[0].expiryTime;

    if (dbOTP == otp) {
        const currentTime = new Date();
        const expiryDateTime = new Date(expiryTime);

        if (currentTime <= expiryDateTime) {
            try {
                const [userRows] = await db.query(
                  'SELECT userEmail, userPassword FROM tempusers WHERE contactNumber = ?',
                  [contactNumber]
                );

                if (userRows.length > 0) {
                    const { userEmail, userPassword } = userRows[0];
                    const userID = await generateUserID();
                    console.log(userID, userEmail, userPassword);
                    await registerUser(userEmail, userPassword);
                    await deleteTempUser(contactNumber);

                    return res.status(200).json({ message: 'User signed up successfully' });
                } else {
                    return res.status(404).json({ message: 'User details not found' });
                }

            } catch (queryError) {
                console.error("Error in try-catch block while validating OTP:", queryError);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            return res.status(404).json({ message: 'OTP Expired: Kindly Enter Valid OTP' });
        }
    } else {
        return res.status(404).json({ message: 'Wrong OTP' });
    }
}

module.exports = { verifyOTP };
