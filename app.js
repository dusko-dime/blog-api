const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');
const sequelize = require('./util/database');
const user = require('./models/user');

const app = express();
app.use(bodyParser.json()); // application/json

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

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));


sequelize.sync({
    force: false,
    logging: console.log
}).then(result => {
    //console.log('KONEKTOVANO JE');
    app.listen(5000);
}).catch(err => {
    console.log('ERROR');
});
