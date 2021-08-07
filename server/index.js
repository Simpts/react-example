import express from "express";
import { URL } from "url";

const staticDir = new URL("../client/build", import.meta.url).pathname;
const fallbackPath = new URL("../client/build/index.html", import.meta.url)
  .pathname;

const app = express();
const port = 4430;

app.use(express["static"](staticDir));

app.get("*", (req, res) => {
  res.sendFile(fallbackPath);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
