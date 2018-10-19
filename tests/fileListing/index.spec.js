import {graphql} from 'graphql';

import schema from '../../server/schema';

describe('fileListing', () => {
    const rootValue = {};
    const context = {};

    test('List the files of a given project', () => {
        const query = `
                query {
                    project(path: "./files") {
                        files {
                            path
                        }
                    }
                }
            `;

        return graphql(schema, query, rootValue, context).then(response => {
            const {files} = response.data.project;
            console.log(files);
        });
    });
});
