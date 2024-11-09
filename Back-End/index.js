const express = require('express');
const cors = require('cors');
require("dotenv").config();

const database = require("./configurations/database")
database.connect();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type,Authorization', 
  credentials: true, 
};


const route = require("./routes/index.route");

const app = express();
const port = process.env.PORT;

// Cors
app.use(cors(corsOptions));

// Middleware để parse JSON
app.use(express.json());
express.urlencoded({ extended: true })

// Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})