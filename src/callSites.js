import * as React from 'react';
import {QueryRenderer, graphql} from 'react-relay';

import environment from './relayEnvironment';

const CallSites = ({path, exportName}) => (
    <QueryRenderer
        environment={environment}
        variables={{path, exportName}}
        query={graphql`
            query callSitesQuery($path: String!, $exportName: String!) {
                project(path: "./fixtures") {
                    file(path: $path) {
                        export(name: $exportName) {
                            callSites {
                                path
                            }
                        }
                    }
                }
            }
        `}
        render={({props, error}) => {
            if (!props || !props.project || !props.project.file) return null;
            // TODO handle nullables
            const {
                project: {
                    file: {
                        export: {callSites},
                    },
                },
            } = props;

            // modify wording for default/named export

            return (
                <div>
                    {callSites.length > 0 ? (
                        <div>
                            {`The export ${exportName} of ${path} is used in:`}
                            <ul>
                                {callSites.map((callSite, index) => (
                                    <li key={index}>{callSite.path}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div>{`The export ${exportName} of ${path} is not used`}</div>
                    )}
                </div>
            );
        }}
    />
);
export default CallSites;
