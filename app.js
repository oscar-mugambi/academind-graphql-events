const express = require('express');
const { graphqlHTTP } = require('express-graphql');

require('dotenv').config();
const mongoose = require('mongoose');

const Event = require('./models/events');
const graphqlSchema = require('./graphql/schema');
const graphqlResolvers = require('./graphql/resolvers');
const app = express();

app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.DB_ACCESS)
  .then(() =>
    app.listen(3002, () => {
      console.log('connected');
    })
  )
  .catch((err) => {
    console.log(err);
  });
