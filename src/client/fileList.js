import * as React from 'react';
import {QueryRenderer, graphql} from 'react-relay';

import environment from './relayEnvironment';

const FileList = ({selectFile}) => (
    <QueryRenderer
        environment={environment}
        query={
            process.browser
                ? graphql`
                      query fileListQuery {
                          files {
                              path
                          }
                      }
                  `
                : null
        }
        render={({error, props}) => {
            if (!props || !props.files) return null;

            return (
                <ul>
                    {props.files.map(file => (
                        <li key={file.path} onClick={() => selectFile(file.path)}>
                            {file.path}
                        </li>
                    ))}
                </ul>
            );
        }}
    />
);
export default FileList;
