const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
const authRoutes = require("../../src/routes/auth");
const articleRoute = require("../../src/routes/articles");
const authMiddleware = require("../../src/middleware/authMiddleware");
const sequelize = require("../../src/models/index");
require("dotenv").config();

let server;

const init = async () => {
  if (!server) {
    server = Hapi.server({
      port: 0, // port tidak penting untuk Netlify Function
      host: "localhost",
    });

    await server.register(Jwt);
    server.auth.strategy("jwt", "jwt", authMiddleware);
    server.auth.default("jwt");

    server.route(authRoutes);
    server.route(articleRoute);

    await sequelize.sync(); // pastikan ini tidak menyebabkan overhead saat cold start
    await server.initialize();
  }

  return server;
};

exports.handler = async (event, context) => {
  const hapiServer = await init();

  const { path, httpMethod, headers, body } = event;
  const requestOptions = {
    method: httpMethod,
    url: path,
    headers,
    payload: body,
  };

  const res = await hapiServer.inject(requestOptions);

  return {
    statusCode: res.statusCode,
    headers: res.headers,
    body: res.payload,
  };
};
