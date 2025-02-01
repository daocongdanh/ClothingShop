const express = require('express');
const cors = require('cors');
require("dotenv").config();

const database = require("./src/configurations/database");
database.connect();
const corsOptions = require("./src/configurations/corsConfig");


const route = require("./src/routes/index.route");

const app = express();
const port = process.env.PORT;

// Cors
app.use(cors(corsOptions));

// Middleware để parse JSON
app.use(express.json());

// Middleware để parse dữ liệu từ form (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})