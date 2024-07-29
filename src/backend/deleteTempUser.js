// signup.js
const db = require('./dbConnection');

async function deleteTempUser(contactNumber) {
    try {
        const deletequery = 'DELETE FROM tempusers WHERE contactNumber = ?';
        const values = [contactNumber];
        await db.query(deletequery,values);
        console.log('TempUsers deleted successfully');

    } catch (err) {
        console.error('Error in deleting tempUsers data:', err);
        throw err; // Re-throw the error to be caught in the calling function
    }
}

module.exports = deleteTempUser;
