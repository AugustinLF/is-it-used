import {gql} from 'apollo-server-express';
import {getAllFiles} from './fileSystem';

export const typeDefs = gql`
    type File {
        id: ID
        path: String!
    }

    type Query {
        files: [File!]!
    }
`;

export const resolvers = {
    Query: {
        files: () => getAllFiles(['./fixtures']),
    },
};
