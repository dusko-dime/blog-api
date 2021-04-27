const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {generateAccessToken} = require("../../../util/functionalities");

const resolvers = {
    Query: {
        hello: async function (s, req) {
            return 'hello';
        },
    },
    Mutation: {
        registerAccount: async function(parent, {registerAccountInput: {email, password}}, context, info) {
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
        login: async function(parent, {loginInput: {email, password}}, context, info) {
            try {
                const userDb = await User.findOne({
                    raw: true,
                    where: {
                        email,
                        password
                    }
                });
                if(userDb) {
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
}

module.exports = resolvers;