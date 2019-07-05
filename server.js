const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema.js');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

mongoose.connect('mongodb://Anton:pass123@ds347467.mlab.com:47467/graphql-data', { useNewUrlParser: true });

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const dbConection = mongoose.connection;
dbConection.on('error', err => console.log(`Connection error: ${err}`));
dbConection.once(`open`, () => console.log(`Connection to DB!`));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);	