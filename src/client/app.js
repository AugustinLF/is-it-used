import * as React from 'react';
import {QueryRenderer, graphql} from 'react-relay';

import environment from './relayEnvironment';

class App extends React.Component {
    state = {
        file: null,
    };
    render() {
        return (
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
                                    <li
                                        key={file.path}
                                        onClick={() => this.setState({file: file.path})}
                                    >
                                        {file.path}
                                    </li>
                                ))}
                            </ul>
                        );
                    }}
                />
                <QueryRenderer
                    environment={environment}
                    query={
                        this.state.file
                            ? graphql`
                                  query appFileQuery($path: String!) {
                                      file(path: $path) {
                                          path
                                          absolutePath
                                          exports {
                                              __typename
                                              ... on DefaultExport {
                                                  defaultExportName: name
                                              }
                                              ... on NamedExport {
                                                  namedExportName: name
                                              }
                                          }
                                      }
                                  }
                              `
                            : null
                    }
                    variables={{path: this.state.file}}
                    render={({props, error}) => {
                        if (!props || !props.file) return null;

                        const {file} = props;
                        return (
                            <div>
                                <h2>{file.path}</h2>
                                Exports:
                                {file.exports.length > 0 ? (
                                    <ul>
                                        {file.exports.map(
                                            (fileExport, index) =>
                                                fileExport.__typename === 'DefaultExport' ? (
                                                    <li key={index}>
                                                        Default Export:{' '}
                                                        {fileExport.defaultExportName ||
                                                            'Could not infer export name'}
                                                    </li>
                                                ) : (
                                                    <li key={index}>
                                                        Named export: {fileExport.namedExportName}
                                                    </li>
                                                )
                                        )}
                                    </ul>
                                ) : (
                                    <div>Pas d'exports</div>
                                )}
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default App;
