import express from "express";
import { URL } from "url";
import routes from "./routes";
const app = express();
const port = 4430;

});

const staticDir = new URL("../client/build", import.meta.url).pathname;
app.use(express["static"](staticDir));
app.use(routes());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
