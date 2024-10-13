const express = require('express');
const router = express.Router();
const { Category } = require('../../models'); 
const authenticateJWT = require('../../middlewares/authMiddleware'); 

router.patch('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const { CategoryName } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        if (CategoryName) {
            category.CategoryName = CategoryName;
        }

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const { CategoryName } = req.body; // Assuming the grade has a name

        if (!CategoryName) {
            return res.status(400).json({ error: 'Category name is required' });
        }

        const newCategory = await Category.create({ CategoryName });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
