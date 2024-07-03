const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphQL');
require('dotenv').config();
const cors = require('cors');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('db connection successful');
    });
  

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  

  const app = express()
  app.use(cors());

  const port = process.env.PORT || 3001;

  server.applyMiddleware({app})

  app.listen(port, () => {
  console.log(`app running on port ${port}...`);
})};

startServer();