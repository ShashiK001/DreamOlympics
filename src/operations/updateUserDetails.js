const db = require('../backend/dbConnection');
const getTokenUserID = require('../backend/getTokenUserID');
const validateToken = require('../backend/validateToken');

async function updateUserDetails(req, res) {
    const { Name, Contact, Address, Amount } = req.body;
    const authHeader = req.headers.authorization;
    const fieldsToUpdate = {};

    if (Name !== undefined) fieldsToUpdate.Name = Name;
    if (Contact !== undefined) fieldsToUpdate.Contact = Contact;
    if (Address !== undefined) fieldsToUpdate.Address = Address;
    if (Amount !== undefined) fieldsToUpdate.Amount = Amount;

    if (Object.keys(fieldsToUpdate).length === 0) {
        console.log("No Fields To Update");
        return res.status(400).json({ message: 'No Fields To Update' });
    }

    if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).json({ message: 'Kindly provide Token First' });
    }

    try {
        const reqToken = authHeader.split(' ')[1];
        console.log('Extracted Token:', reqToken);

        const userID = getTokenUserID(reqToken); 
        console.log('Extracted User ID:', userID);

        if (validateToken(reqToken, userID)) {
            console.log("Token is valid");

        
            const fields = Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ');
            const values = [...Object.values(fieldsToUpdate), userID];
            const updateQuery = `UPDATE userdetails SET ${fields} WHERE userID = ?`;
            console.log('Executing query:', updateQuery, values);

            try {
          
                const [result] = await db.query(updateQuery, values);
                console.log('Update Result:', result);

                if (result.affectedRows === 1) {
                    return res.status(200).json({ message: 'User details updated successfully' });
                } else {
                    return res.status(404).json({ message: 'User details not found' });
                }
            } catch (err) {
                console.error("Error executing update query:", err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            console.log('Token is Invalid');
            return res.status(401).json({ message: 'Token is Invalid' });
        }
    } catch (error) {
        console.error('Token Error:', error.message);
        return res.status(401).json({ error: error.message });
    }
}

module.exports = { updateUserDetails };
