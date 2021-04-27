const { gql } = require('apollo-server');

const typeDefs = gql`
    type Blog {
        id: ID!
        name: String
        imageUrl: String
    }
    
    input BlogInput {
        name: String!
        imageUrl: String!
    }
    
    type Query {
        blogs(): [Blog]
    }
    
    type Mutation {
        createBlog(blogInput: BlogInput!): Blog!
    }
`;

module.exports = typeDefs;