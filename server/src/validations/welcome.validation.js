const { z } = require('zod');

const welcomeMessageSchema = z.object({
	message: z.string().min(2, 'Message must be at least 2 characters long')
});

module.exports = {
	welcomeMessageSchema,
};
