const signup = require('./signup');
const login = require('./login');
const saveUserDetails = require('../operations/saveUserDetails');
const getUserDetails=require('../operations/getUserDetails');
const updateUserDetails=require('../operations/updateUserDetails');


function routes(app) {
    app.post('/signup', signup.signup);
    app.post('/login', login.login);
    app.post('/saveUserDetails', saveUserDetails.saveUserDetails);
    app.get('/getUserDetails', getUserDetails.getUserDetails);
    app.post('/updateUserDetails', updateUserDetails.updateUserDetails);
}

module.exports = routes;
