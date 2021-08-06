import express from "express";
const app = express();
const port = 4430;

app.get("/", (_, res) => {
  res.send("Hello World!")
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});
