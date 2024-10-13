const express = require('express');
const router = express.Router();
const { Grade } = require('../../models'); 
const authenticateJWT = require('../../middlewares/authMiddleware'); 

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const grades = await Grade.findAll();
        res.status(200).json(grades); 
    } catch (error) {
        console.error('Error fetching grades:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
