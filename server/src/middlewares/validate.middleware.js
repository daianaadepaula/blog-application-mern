function validate(schema) {
	return (req, res, next) => {
		try {
			console.log(`Body request validate: ${JSON.stringify(req.body)}`);
			req.body = schema.parse(req.body);
			next();
		} catch (err) {
			console.error(`Error validate: ${err.errors}`);
			return res.status(400).json({ error: err.errors });
		}
	};
}

function validatePartial(schema) {
	return (req, res, next) => {
		try {
			req.body = schema.partial().parse(req.body);
			next();
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}
	};
}

module.exports = {
	validate,
	validatePartial,
};
