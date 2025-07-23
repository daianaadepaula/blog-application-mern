const { z } = require("zod");

const blogSchema = z.object({
	title: z.string().min(2, "Title is required"),
	description: z.string().min(2, "Description is required"),
	content: z.string().min(2, "Content is required"),
});

const blogPartialSchema = z.object({
	title: z.string().min(2).optional(),
	description: z.string().min(2).optional(),
	content: z.string().min(2).optional(),
});

module.exports = { blogSchema, blogPartialSchema };
