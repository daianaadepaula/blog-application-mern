const express = require('express');
const validate = require('../middlewares/validate.middleware');
const { getHome } = require("../controllers/index");
const { welcomeMessageSchema } = require("../validations/welcome.validation");

const router = express.Router();

router.get("/", validate(welcomeMessageSchema), getHome);

module.exports = router;
