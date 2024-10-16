const express = require('express');
const router = express.Router();
const { Thread, Category, Grade, User } = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware');


router.get('/', authenticateJWT, async (req, res) => {
    try {
        // Extract query parameters
        const { category, grade, search } = req.query;

        // Build a dynamic filter object
        const filters = {};

        if (category && category > 0) {
            filters.CategoryId = category;  // Assuming you have CategoryId as foreign key
        }

        if (grade && grade > 0) {
            filters.GradeId = grade;  // Assuming you have GradeId as foreign key
        }

        if (search && search !== '') {
            filters[Op.or] = [
                { ThreadName: { [Op.like]: `%${search}%` } }, // Search in ThreadName
                { ThreadText: { [Op.like]: `%${search}%` } }  // Search in ThreadText
            ];
        }

        // Fetch threads based on the filters
        const ThreadsAll = await Thread.findAll({
            where: filters, // Apply the filters dynamically
            include: [
                { model: Category, attributes: ['CategoryName'] },
                { model: Grade, attributes: ['GradeName'] }
            ]
        });

        res.status(200).json(ThreadsAll);
    } catch (error) {
        console.error('Error fetching user threads:', error);
        res.status(500).json({ error: "An error occurred while fetching threads." });
    }
});

module.exports = router;
