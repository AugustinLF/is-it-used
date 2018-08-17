const {ApolloServer, gql} = require('apollo-server-express');
const express = require('express');
const next = require('next');

const {typeDefs, resolvers} = require('./graphql');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
        console.log(error);
        throw error;
    },
});

app.prepare().then(() => {
    const server = express();

    apolloServer.applyMiddleware({
        app: server,
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    const port = 3000;
    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
