const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {generateAccessToken} = require("../util/functionalities");

module.exports = {
    hello: async function (s, req) {
        return 'hello';
    },
    registerAccount: async function({registerAccountInput: {email, password}}, res) {
        console.log(res, 'RESPONSE');
        try {
            const result = await User.create({
                email,
                username: email,
                password,
            });
            return result.dataValues;
        } catch (err) {
            console.error(err);
        }
    },
    login: async function({loginInput: {email, password}}, res) {
        try {
            const userDb = await User.findOne({
                raw: true,
                where: {
                    email,
                    password
                }
            });
            console.log(userDb, 'USER DB');
            const accessToken = generateAccessToken(userDb.username, userDb.id);
            //res.setHeader('token', accessToken);
            return {
                id: userDb.id,
                email: userDb.email,
                username: userDb.username
            }
        } catch (e) {
            console.error(e);
        }
    }
}