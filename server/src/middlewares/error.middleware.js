const { ZodError } = require("zod");

function errorMiddleware(err, req, res, next) {
	console.error('Erro capturado:', err);

	if (err instanceof ZodError) {
		const formattedErrors = err.issues.map((e) => ({
			field: e.path?.[0] || 'unknown',
			message: e.message,
		}));
		return res.status(422).json({
			error: 'Validation failed',
			details: formattedErrors,
		});
	}

	const status = err.status || 500;
	const message = err.message || 'Internal Server Error';

	return res.status(status).json({
		error: message,
	});
}

module.exports = errorMiddleware;
