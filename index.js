const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
mongoose.connect('mongodb://localhost:27017/test');
app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(3000,() => console.log('Server is running on port 3000'));