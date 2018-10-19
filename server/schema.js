const {gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const {resolve} = require('path');

const {getDefaultFileExports, getNamedFileExports} = require('./getFileExports');
const {getAllFiles} = require('./fileSystem');
const {isImported} = require('./isImported');

const typeDefs = gql`
    interface FileExport {
        # Should perhaps be named otherwise since an export is not really a call-site
        callSites: [File!]!
    }

    type Project {
        id: String!
        path: String!
        files: [File!]!
        file(path: String!): File
    }

    type DefaultExport implements FileExport {
        name: String
        callSites: [File!]!
    }
    type NamedExport implements FileExport {
        name: String!
        callSites: [File!]!
    }

    type File {
        id: ID
        path: String!
        absolutePath: String!
        exports: [FileExport!]!
        export(name: String!): FileExport
    }

    type Query {
        project(path: String!): Project
    }
`;

const resolvers = {
    Query: {
        project: (_, {path}) => ({path}),
    },
    Project: {
        id: ({path}) => path,
        path: ({path}) => path,
        files: ({path}) => getAllFiles([path]),
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
        callSites,
    },
    NamedExport: {
        callSites,
    },
};

const getFileDependents = (files, {path, type, name}) => {
    let callSitesFiles = [];
    /*
        Three cases:
            - imported and use => we keep it
            - imported and reexported => we need to redo that (determine which export is the one)
            - not used
    */
    for (const file of files) {
        const imported = isImported(file, {path, type, name});
        if (imported) {
            if (imported.used) callSitesFiles.push(file);

            if (imported.defaultExport) {
                callSitesFiles = [
                    ...callSitesFiles,
                    ...getFileDependents(files, {path: file, type: 'default', name}),
                ];
            }
        }
    }
    return callSitesFiles;
};
function callSites(params) {
    return getAllFiles(['./fixtures']).then(files => getFileDependents(files, params));
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = {
    schema,
};
