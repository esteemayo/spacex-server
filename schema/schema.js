const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require("graphql");

const apiEndpoint = "https://api.spacexdata.com/v3";

const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        const { data: launches } = await axios.get(`${apiEndpoint}/launches`);
        return launches;
      },
    },
    launch: {
      type: LaunchType,
      args: { flight_number: { type: GraphQLInt } },
      async resolve(parent, { flight_number }) {
        const { data: launch } = await axios.get(
          `${apiEndpoint}/launches/${flight_number}`
        );
        return launch;
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        const { data: rockets } = await axios.get(`${apiEndpoint}/rockets`);
        return rockets;
      },
    },
    rocket: {
      type: RocketType,
      args: { rocket_id: { type: GraphQLString } },
      async resolve(parent, { rocket_id }) {
        const { data: rocket } = await axios.get(
          `${apiEndpoint}/rockets/${rocket_id}`
        );
        return rocket;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
