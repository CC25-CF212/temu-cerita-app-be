const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

const authRoutes = require('./src/routes/auth');
const articleRoute = require('./src/routes/articles');
const authMiddleware = require('./src/middleware/authMiddleware')
const sequelize = require('./src/models/index');
require('dotenv').config();


const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  await server.register(Jwt);
  server.auth.strategy('jwt','jwt',authMiddleware);
  server.auth.default('jwt');

  server.route(authRoutes);
  server.route(articleRoute);

  // Sync DB
  await sequelize.sync(); 


  await server.start();
  
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();