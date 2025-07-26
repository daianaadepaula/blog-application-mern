function isZodError(error) {
	return error && Array.isArray(error.errors) && error.errors.every(e => e.path && e.message);
}

function validate(schema) {
	return (req, res, next) => {
		try {
			req.body = schema.parse(req.body);
			next();
		} catch (err) {
			if (isZodError(err)) {
				const formattedErrors = err.errors.map((e) => ({
					field: e.path?.[0] || "unknown",
					message: e.message,
				}));
				console.error(`Validation Error: ${JSON.stringify(formattedErrors)}`);
				return res.status(422).json({
					error: "Validation failed",
					details: formattedErrors,
				});
			}

			console.error("Erro desconhecido em validate:", err);
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
			if (isZodError(err)) {
				const formattedErrors = err.errors.map((e) => ({
					field: e.path?.[0] || "unknown",
					message: e.message,
				}));
				console.error(`Validation Error (partial): ${JSON.stringify(formattedErrors)}`);
				return res.status(422).json({
					error: "Validation failed",
					details: formattedErrors,
				});
			}

			console.error("Erro desconhecido em validatePartial:", err);
			next(err);
		}
	};
}

module.exports = {
	validate,
	validatePartial,
};
