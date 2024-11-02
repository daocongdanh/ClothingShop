const express = require('express');
require("dotenv").config();

const database = require("./configurations/database")
database.connect();


const route = require("./routes/index.route");

const app = express();
const port = process.env.PORT;

// Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})