const WelcomeMessage = require("../models/index.model");

const getWelcomeMessage = async () => {
	let messageDoc = await WelcomeMessage.findOne();

	if (!messageDoc) {
		messageDoc = await WelcomeMessage.create({ message: "Hello World!!!!!!" });
	}

	return messageDoc.message;
};

module.exports = {
	getWelcomeMessage,
};