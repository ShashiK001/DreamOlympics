const signup = require('./signup');
const login = require('./login');
const saveUserDetails = require('../operations/saveUserDetails');
const getUserDetails=require('../operations/getUserDetails');
const updateUserDetails=require('../operations/updateUserDetails');
const validate=require('./validateUser');
const validateToken=require('./validateToken');
const generateOTP=require("./signup");
const verifyOTP=require("./verifyOTP");


function routes(app) {
    app.post('/signup', signup.signup);
    app.post('/verifyOTP', verifyOTP.verifyOTP);
    app.post('/login', validate,login.login);
    app.post('/saveUserDetails', validateToken,saveUserDetails.saveUserDetails);
    app.get('/getUserDetails', validateToken,getUserDetails.getUserDetails);
    app.post('/updateUserDetails', validateToken,updateUserDetails.updateUserDetails);
}

module.exports = routes;
