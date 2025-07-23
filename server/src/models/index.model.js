const mongoose = require("mongoose");

const WelcomeMessageSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
			minlength: 2,
		},
	},
	{
		timestamps: true,
	}
);

const WelcomeMessage = mongoose.model("WelcomeMessage", WelcomeMessageSchema);

module.exports = WelcomeMessage;