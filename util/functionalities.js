const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

const generateAccessToken = (username, userId) => {
    dotenv.config();
    return jwt.sign({username, userId}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

const checkAccessToken = (token) => {
    dotenv.config();
    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports = {
    generateAccessToken,
    checkAccessToken
}