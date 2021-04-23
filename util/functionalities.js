const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

function generateAccessToken(username, userId) {
    dotenv.config();
    return jwt.sign({username, userId}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

module.exports = {
    generateAccessToken
}