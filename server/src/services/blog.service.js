const BlogModel = require("../models/blog.model");

const getAllBlogs = () => BlogModel.find();

const getBlogById = (id) => BlogModel.findById(id);

const createBlog = (data) => BlogModel.create(data);

const deleteBlog = async (id) => {
	const blog = await BlogModel.findById(id);
	if (!blog) {
		throw new Error("Blog not found");
	}
	await BlogModel.findByIdAndDelete(id);
	return blog;
};

const updateBlog = async (id, data) => {
	const blog = await BlogModel.findById(id);
	if (!blog) {
		throw new Error("Blog not found");
	}
	return await BlogModel.findByIdAndUpdate(id, data, {
		new: true,
		runValidators: true,
	});
};

module.exports = {
	getAllBlogs,
	getBlogById,
	createBlog,
	deleteBlog,
	updateBlog,
};
