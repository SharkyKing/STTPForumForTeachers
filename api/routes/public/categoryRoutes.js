const express = require('express');
const router = express.Router();
const { Category } = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware');

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories); 
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
