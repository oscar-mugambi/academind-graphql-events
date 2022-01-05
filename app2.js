const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(express());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(
      `
      type Event {
        name:String!
        location:String!
      }

      type RootQuery {
        event:Event
      }

      input EventInput {
        name:String!
        location:String!
      }

      type RootMutation {
        createEvent(input:EventInput): Event
      }

      schema {
        query:RootQuery
        mutation:RootMutation
      }

    `
    ),
    rootValue: {
      event: () => {
        return { name: 'Nai', location: 'Nai' };
      },
      createEvent: () => {
        return { name: 'Nai', location: 'Nai' };
      },
    },
    graphiql: true,
  })
);

app.listen(3006, () => {
  console.log('connected');
});
