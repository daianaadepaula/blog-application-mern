require("dotenv").config({
	path: ".env"
})

const app = require("./src/app")
const connectMONGODB = require("./src/config/db.config")

connectMONGODB()

const port = 3001
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})