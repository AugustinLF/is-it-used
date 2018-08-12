import ApolloClient from 'apollo-boost';
import React from 'react';
import {ApolloProvider, Query} from 'react-apollo';
import gql from 'graphql-tag';
import fetch from 'isomorphic-unfetch';

// @ts-ignore Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    // @ts-ignore
    global.fetch = fetch;
}

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
});

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <Query
                query={gql`
                    {
                        hello
                    }
                `}
            >
                {({data}) => <div>{data.hello}</div>}
            </Query>
        </div>
    </ApolloProvider>
);

export default App;
