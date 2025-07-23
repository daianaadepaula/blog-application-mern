const mongoose = require("mongoose");

const connectMONGODB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log(`The database is connect with ${mongoose.connection.host}`);
	} catch (error) {
		console.error(`Error connecting to the database: ${error}`);
		mongoose.disconnect();
		process.exit(1);
	}
}

module.exports = connectMONGODB 