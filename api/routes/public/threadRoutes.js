const express = require('express');
const router = express.Router();
const { Thread, Category, Grade, User } = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware');


module.exports = router;
