const {gql} = require('apollo-server-express');

export const typeDefs = gql`
    type Query {
        hello: String
    }
`;

export const resolvers = {
    Query: {
        hello: () => 'world',
    },
};
