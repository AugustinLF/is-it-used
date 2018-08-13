import React from 'react';
import {QueryRenderer, graphql} from 'react-relay';

import environment from './relayEnvironment';

const App = () => (
    <div>
        <h2>Is it used?</h2>
        <QueryRenderer
            environment={environment}
            query={
                process.browser
                    ? graphql`
                          query appQuery {
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
                            <li key={file.path}>{file.path}</li>
                        ))}
                    </ul>
                );
            }}
        />
    </div>
);

export default App;
