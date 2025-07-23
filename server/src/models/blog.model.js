const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		content: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;
