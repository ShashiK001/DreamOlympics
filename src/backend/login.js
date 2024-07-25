async function login(req, res) {
    const { token } = req;
    console.log('Logging Successful');
    res.json({ message: "Logged Successfully", token });
}

module.exports = { login };
