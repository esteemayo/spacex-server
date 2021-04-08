const cors = require("cors");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

// Implement Cors
app.use(cors());

// Access-Control-Allow-Origin
app.options("*", cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

module.exports = app;
