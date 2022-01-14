const express = require("express");
const app = express();
const Gun = require("gun");
const path = require("path");

const port = Process.env.PORT || 3001;

app.use(Gun.serve);
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

Gun({ web: server });
