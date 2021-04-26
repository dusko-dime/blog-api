const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');
const sequelize = require('./util/database');
const user = require('./models/user');
const {generateAccessToken} = require("./util/functionalities");
const {checkAccessToken} = require("./util/functionalities");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');
const dotenv = require("dotenv");


const app = express();
app.use(bodyParser.json()); // application/json
dotenv.config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method == 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// const authorizationMiddleware = (req, res, next) => {
    // const authorization = req.get("Authorization");
    // const ca = checkAccessToken(authorization);
    // console.log(ca, 'ALOOO', ca === true);
    // if(ca) {
    //     req.isAuthenticated = true;
    //     next();
    // }
    // else {
    //     res.statusCode = 401;
    //     res.set("Content-Type", "application/json");
    //     res.send({
    //         error: true
    //     });
    // }
//}

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
    next();
});

const refreshTokenMiddleware = (req, res, next) => {
    console.log('REFRESH TOKEN');
    const authorization = req.get("Authorization");
    try {
        const jwtObj = jwt.decode(authorization);
        const accessToken = generateAccessToken(jwtObj.username, jwtObj.userId);
        res.set("Authorization", accessToken);
        next();
    } catch(e) {
        console.error(e);
        next();
    }
}

app.use('/graphql',
    // authorizationMiddleware,
    expressJwt({secret: process.env.TOKEN_SECRET, algorithms: ['HS256'], credentialsRequired: false}),
    graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    // customValidateFn() {
    //   console.log('ALOOOOO');
    // },
    customFormatErrorFn(err) {
        if(!err.originalError) {
            return err;
        }
        const code = err.originalError.statusCode || 500;
        const message = err.originalError.message || 'Error has occurred';
        return {
            code,
            message
        }
    }
}), refreshTokenMiddleware);

//handling errors from other middlewares
app.use('/', (req, res, next) => {
    console.log('ALOOOOOOOOOOOOOOO');
    res.statusCode = 500;
    res.send('Error has occured');
});

sequelize.sync({
    force: false,
    logging: console.log
}).then(result => {
    //console.log('KONEKTOVANO JE');
    app.listen(5000);
}).catch(err => {
    console.log('ERROR');
});
