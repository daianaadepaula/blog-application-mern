const { getWelcomeMessage } = require("../services/index");

const getHome = async (req, res) => {
	try {
		const message = getWelcomeMessage();
		res.status(200).send(message);
	} catch (error) {
		console.error(`Error controller getHome: ${error}`);
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getHome,
};
