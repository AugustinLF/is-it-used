import {gql} from 'apollo-server-express';
import {resolve} from 'path';

import {getDefaultFileExports, getNamedFileExports} from './getFileExports';
import {getAllFiles} from './fileSystem';
import {isImported} from './isImported';

export const typeDefs = gql`
    interface FileExport {
        # Sould perhaps be named otherwise since an export is not really a call site
        callsites: [File!]!
    }

    type DefaultExport implements FileExport {
        name: String
        callsites: [File!]!
    }
    type NamedExport implements FileExport {
        name: String!
        callsites: [File!]!
    }

    type File {
        id: ID
        path: String!
        absolutePath: String!
        exports: [FileExport!]!
        export(name: String!): FileExport
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
            return path;
        },
    },
    File: {
        id: path => path,
        path: path => path,
        exports: path => {
            const defaultExport = getDefaultFileExports(path);
            const namedExports = getNamedFileExports(path);

            const fileExports = [];
            if (defaultExport) fileExports.push(defaultExport);

            return [...fileExports, ...namedExports];
        },
        absolutePath: path => resolve(path),
        export: (path, {name}) => {
            // TODO should check for existence
            return {
                type: name === 'default' ? 'default' : 'named',
                // this doesn't handle default name
                name,
                path,
            };
        },
    },
    FileExport: {
        __resolveType(obj, _, info) {
            if (obj.type === 'default') return info.schema.getType('DefaultExport');
            if (obj.type === 'named') return info.schema.getType('NamedExport');
        },
    },
    DefaultExport: {
        callsites,
    },
    NamedExport: {
        callsites,
    },
};

function callsites({path, type, name}) {
    return getAllFiles(['./fixtures']).then(files =>
        files.filter(file => isImported(file, {path, type, name}))
    );
}
