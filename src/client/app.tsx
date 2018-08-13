import React from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

const App = () => (
    <div>
        <h2>My first Apollo app 🚀</h2>
        {process.browser && (
            <Query
                query={gql`
                    {
                        files {
                            path
                        }
                    }
                `}
            >
                {({data}) =>
                    console.log(data) || (
                        <div>{data.files && data.files.map(file => <span>file.path</span>)}</div>
                    )
                }
            </Query>
        )}
    </div>
);

export default App;
