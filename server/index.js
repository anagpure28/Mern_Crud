const express = require("express");
const cors = require("cors");
const connection = require("./db");
const movieRoutes = require("./routes/movies");
require("dotenv").config();

const app = express();

connection()

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", movieRoutes);

const port = process.env.PORT || 9090;
app.listen(port,()=> {
    try {
        console.log(`Listening on port ${port}...`)
    } catch (err) {
        console.log(err)
    }
});