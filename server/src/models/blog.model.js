const { z } = require("zod");

const blogSchema = z.object({
	title: z.string({ required_error: "Título é obrigatorio" })
		.min(2, "Título pelo menos 2 caracteres"),
	description: z.string({ required_error: "Descrição é obrigatoria" })
		.min(2, "Descrição pelo menos 2 caracteres"),
	content: z.string({ required_error: "Conteúdo é obrigatorio" })
		.min(2, "Conteúdo pelo menos 2 caracteres"),
});

const blogPartialSchema = blogSchema.partial();

module.exports = { blogSchema, blogPartialSchema };
