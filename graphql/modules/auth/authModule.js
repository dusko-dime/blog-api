const {createModule} = require('graphql-modules');
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const authModule = createModule({
    id: 'auth-module',
    dirname: __dirname,
    typeDefs: [
        typeDefs
    ],
    resolvers: resolvers
});

module.exports = authModule;