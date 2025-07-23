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
		res.status(500).json({ error: error.message });
	}
};

const getById = async (req, res) => {
	try {
		const blog = await getBlogById(req.params.id);
		if (!blog) {
			return res.status(404).json({ error: "Blog not found" });
		}
		res.status(200).json(blog);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const create = async (req, res) => {
	try {
		const newBlog = await createBlog(req.body);
		res.status(201).json({
			message: "Blog Created :)",
			data: newBlog,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const remove = async (req, res) => {
	try {
		const deleted = await deleteBlog(req.params.id);
		res.status(200).json({
			message: "Blog Deleted :)",
			title: deleted.title,
		});
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
};

const update = async (req, res) => {
	try {
		const updated = await updateBlog(req.params.id, req.body);
		res.status(200).json({
			message: "Blog Updated :)",
			data: updated,
		});
	} catch (error) {
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
