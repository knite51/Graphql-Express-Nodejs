const { graphqlHTTP } = require('express-graphql');

const schema = require('../schema/graphglSchema');

module.exports = graphqlHTTP({
  schema,
  graphiql: true,
});
