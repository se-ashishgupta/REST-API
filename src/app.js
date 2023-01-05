const express = require("express");
require("./db/conn");
const app = express();
const PORT = 7000;
const Studentrouter = require("../src/router/student");

app.use(express.json());

app.use(Studentrouter);

app.listen(PORT, () => {
  console.log(`listen to port ${PORT}`);
});
