const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const authRoutes = require("../../src/routes/auth");
const articleRoutes = require("../../src/routes/articles");
const authMiddleware = require("../../src/middleware/authMiddleware");
const sequelize = require("../../src/models");
require("dotenv").config();

let server;

const init = async () => {
  if (!server) {
    server = Hapi.server({
      port: 0,
      host: "localhost",
    });

    await server.register(Jwt);
    server.auth.strategy("jwt", "jwt", authMiddleware);
    server.auth.default("jwt");

    server.route(authRoutes);
    server.route(articleRoutes);

    await sequelize.sync();
    await server.initialize();
  }

  return server;
};

exports.handler = async (event, context) => {
  const server = await init();

  const { path, httpMethod, headers, body } = event;

  const response = await server.inject({
    method: httpMethod,
    url: path.replace("/api", ""),
    headers,
    payload: body,
  });

  return {
    statusCode: response.statusCode,
    headers: response.headers,
    body: response.payload,
  };
};
