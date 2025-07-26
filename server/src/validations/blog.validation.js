const { z } = require("zod");

const blogSchema = z.object({
	title: z.string().min(2, "Título é obrigatorio"),
	description: z.string().min(2, "Descrição é obrigatorio"),
	content: z.string().min(2, "Conteúdo é obrigatorio"),
});

const blogPartialSchema = blogSchema.partial();

module.exports = { blogSchema, blogPartialSchema };
