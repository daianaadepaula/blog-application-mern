const express = require('express')
const errorMiddleware = require('./middlewares/error.middleware');
const cors = require("cors")

const app = express()

app.use(cors());
app.use(express.json());

app.use("/blogs", require("./routes/blog.routes"));

app.use((err, req, res, next) => {
	console.error(`Error Global: ${err}`);
	res.status(500).json({ error: "Something went wrong" });
});

app.use(errorMiddleware);

module.exports = app