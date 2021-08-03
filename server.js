const express = require('express');
const cors = require('cors');

const home_router = require('./routes/home');
const grapql_router = require('./routes/graphQl');

/** App Initialisation */
const app = express();

/** Middleware Applications */
app.use(cors());

/** Route Middleware */
app.use('/', home_router);

app.use('/graphql', grapql_router);

app.listen(5000, () => {
  console.log('App listening on port 5000!');
});
