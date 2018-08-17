import {gql} from 'apollo-server-express';
import {resolve} from 'path';

import {getDefaultFileExports, getNamedFileExports} from './getFileExports';
import {getAllFiles} from './fileSystem';

export const typeDefs = gql`
    union FileExport = NamedExport | DefaultExport
    type File {
        id: ID
        path: String!
        absolutePath: String!
        exports: [FileExport!]!
    }

    type DefaultExport {
        name: String
    }
    type NamedExport {
        name: String!
    }

    type Query {
        files: [File!]!
        file(path: String!): File
    }
`;

export const resolvers = {
    Query: {
        files: () => getAllFiles(['./fixtures']),
        // TODO should check for existence
        file(_, {path}) {
            const file = {path};
            return file;
        },
    },
    File: {
        id: ({path}) => path,
        exports: ({path}) => {
            const defaultExport = getDefaultFileExports(path);
            const namedExports = getNamedFileExports(path);

            const fileExports = [];
            if (defaultExport) fileExports.push(defaultExport);

            return [...fileExports, ...namedExports];
        },
        absolutePath: ({path}) => resolve(path),
    },
    FileExport: {
        __resolveType(obj, _, info) {
            if (obj.type === 'default') return info.schema.getType('DefaultExport');
            if (obj.type === 'named') return info.schema.getType('NamedExport');
        },
    },
};
