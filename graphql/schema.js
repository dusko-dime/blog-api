const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id: ID!
        username: String
        accessToken: String
    }
    
    input RegisterAccountInputData {
        email: String!
        password: String!
    }
    
    input LoginInputData {
        email: String!
        password: String!
    }
    
    type RootQuery {
        hello: String!        
    }
    
    type RootMutation {
        registerAccount(registerAccountInput: RegisterAccountInputData!): User!
        login(loginInput: LoginInputData!): User!
    }
    
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);