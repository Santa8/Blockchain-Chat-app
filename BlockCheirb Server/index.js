const express = require("express");
const app = express();
const Gun = require("gun");

const port = 3001;

app.use(Gun.serve);

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

Gun({ web: server });
