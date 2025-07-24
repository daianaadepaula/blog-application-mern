function validate(schema) {
	return (req, res, next) => {
		try {
			console.log(`Body request validate: ${JSON.stringify(req.body)}`);
			req.body = schema.parse(req.body);
			next();
		} catch (err) {
			if (err.errors) {
				const formattedErrors = err.errors.map((e) => ({
					field: e.path[0],
					message: e.message,
				}));
				console.error(`Validation Error: ${JSON.stringify(formattedErrors)}`);
				return res.status(422).json({
					error: "Validation failed",
					details: formattedErrors,
				});
			}
			next(err);
		}
	};
}

function validatePartial(schema) {
	return (req, res, next) => {
		try {
			req.body = schema.partial().parse(req.body);
			next();
		} catch (err) {
			if (err.errors) {
				const formattedErrors = err.errors.map((e) => ({
					field: e.path[0],
					message: e.message,
				}));
				console.error(`Validation Error (partial): ${JSON.stringify(formattedErrors)}`);
				return res.status(422).json({
					error: "Validation failed",
					details: formattedErrors,
				});
			}
			next(err);
		}
	};
}

module.exports = {
	validate,
	validatePartial,
};
