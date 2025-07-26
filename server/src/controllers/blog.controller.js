const {
	getAllBlogs,
	getBlogById,
	createBlog,
	deleteBlog,
	updateBlog,
} = require("../services/blog.service");

const getAll = async (req, res) => {
	try {
		const blogs = await getAllBlogs();
		res.status(200).json(blogs);
	} catch (error) {
		console.error(`Controller getAll error: ${error}`);
		res.status(500).json({ error: error.message });
	}
};

const getById = async (req, res) => {
	try {
		const blog = await getBlogById(req.params.id);
		if (!blog) {
			return res.status(404).json({ error: "Post não encontrado" });
		}
		res.status(200).json(blog);
	} catch (error) {
		console.error(`Controller getById error: ${error}`);
		res.status(500).json({ error: error.message });
	}
};

const create = async (req, res) => {
	try {
		const newBlog = await createBlog(req.body);
		res.status(201).json({
			message: "Post Criado com Sucesso :)",
			data: newBlog,
		});
	} catch (error) {
		console.error(`Controller create error: ${error}`);
		res.status(500).json({ error: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const deleted = await deleteBlog(req.params.id);
		res.status(200).json({
			message: "Post deletado com sucesso :)",
			title: deleted.title,
		});
	} catch (error) {
		console.error(`Controller remove error: ${error}`);
		res.status(404).json({ error: error.message });
	}
};

const update = async (req, res) => {
	try {
		const updated = await updateBlog(req.params.id, req.body);
		res.status(200).json({
			message: "Post atualizado com sucesso :)",
			data: updated,
		});
	} catch (error) {
		console.error(`Controller update error: ${error}`);
		res.status(404).json({ error: error.message });
	}
};

module.exports = {
	getAll,
	getById,
	create,
	remove,
	update,
};
