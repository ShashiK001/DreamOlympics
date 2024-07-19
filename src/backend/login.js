const validateUser = require('./validateUser');
const validateToken = require('./validateToken');

async function login(req, res) {
    const { userID, userPassword } = req.body;
    const authHeader = req.headers.authorization;

    try {
        if (authHeader) {
            const reqToken = authHeader.split(' ')[1];
            const hasValidToken = validateToken(reqToken, userID);

            if (hasValidToken) {
                console.log("User is already logged in");
                return res.json({ message: "User is already logged in", token: reqToken });
            }
        }

        const { token } = await validateUser(userID, userPassword);
        console.log('Logging Successful');
        res.json({ message: "Logged Successfully", token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid Credential' });
    }
}

module.exports = { login };
