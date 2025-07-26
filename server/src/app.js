const express = require('express')
const errorMiddleware = require('./middlewares/error.middleware');
const cors = require("cors")

const app = express()

app.use(express.json());
app.use(cors());

app.use("/blogs", require("./routes/blog.routes"));

app.use(errorMiddleware);

module.exports = app