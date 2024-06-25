const express = require("express");

const app = express();
const port = 4000;
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`here we listen the reaponse in ${port}`);
  console.log("learning");
});
