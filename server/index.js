import "dotenv/config.js";
import express from "express";
import { URL } from "url";
import routes from "./routes";

// eslint-disable-next-line no-magic-numbers
const PORT = process.env.PORT ?? 8080;
const HOST = process.env.HOST ?? "localhost";
const STATIC = process.env.STATIC ?? "../client/build";

function startApp() {
  const app = express();
  const staticPath = new URL(STATIC, import.meta.url).pathname;

  app.use(express.static(staticPath));
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(routes());

  app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
  });

  return app;
}

startApp();
