const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {generateAccessToken} = require("../util/functionalities");

module.exports = {
    hello: async function (s, req) {
        return 'hello';
    },
    registerAccount: async function({registerAccountInput: {email, password}}, res) {
        // ERRORS HANDLING FROM GRAPHQL
        // const notAuthenticatedError = new Error('Not authenticated');
        // notAuthenticatedError.statusCode = 401;
        // throw notAuthenticatedError;
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
    login: async function({loginInput: {email, password}}, args, context) {
        console.log('ARGS: ' + args);
        try {
            const userDb = await User.findOne({
                raw: true,
                where: {
                    email,
                    password
                }
            });
            if(userDb) {
                console.log(userDb, 'USER DB');
                const accessToken = generateAccessToken(userDb.username, userDb.id);
                // args.res.setHeader('token', accessToken);
                return {
                    id: userDb.id,
                    email: userDb.email,
                    username: userDb.username,
                    accessToken: 'Bearer ' + accessToken
                }
            } else throw new Error('No user');
        } catch (e) {
            console.error(e);
        }
    }
}