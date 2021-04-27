const { gql } = require('apollo-server');

const typeDefs = gql`
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
    
    type Query {
        hello: String!        
    }
    
    type Mutation {
        registerAccount(registerAccountInput: RegisterAccountInputData!): User!
        login(loginInput: LoginInputData!): User!
    }
`;

module.exports = typeDefs;