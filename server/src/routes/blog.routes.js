const express = require("express");
const {
	getAll,
	getById,
	create,
	update,
	remove,
} = require("../controllers/blog.controller");

const { validate, validatePartial } = require("../middlewares/validate.middleware");
const { blogSchema, blogPartialSchema } = require("../validations/blog.validation");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/create", validate(blogSchema), create);
router.patch("/update/:id", validatePartial(blogPartialSchema), update);
router.delete("/delete/:id", remove);

module.exports = router;
