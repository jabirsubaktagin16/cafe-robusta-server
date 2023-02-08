const express = require("express");
const config = require("./config");

const connectors = require("./connectors/mongoose");

const createApp = () => {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).send({ message: "Up and Running" });
  });
  return app;
};

async function bootstrap(apiConfig) {
  const app = createApp();
  app.use(apiConfig.config.ENDPOINT, apiConfig.route);

  const port = process.env.PORT || config.DEFAULT_PORT;

  connectors.connectToMongoDB();
  app.listen(port, () => console.log(`Server up and running at: ${port}`));
}

module.exports = { bootstrap };
