const express = require('express');
const router = express.Router();
const { Grade } = require('../../models'); 
const authenticateJWT = require('../../middlewares/authMiddleware'); 

router.patch('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const { GradeName } = req.body; // Assuming only GradeName is editable

        const grade = await Grade.findByPk(id);

        if (!grade) {
            return res.status(404).json({ error: 'Grade not found' });
        }

        if (GradeName) {
            grade.GradeName = GradeName;
        }

        await grade.save();
        res.status(200).json(grade);
    } catch (error) {
        console.error('Error updating grade:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;

        const grade = await Grade.findByPk(id);

        if (!grade) {
            return res.status(404).json({ error: 'Grade not found' });
        }

        await grade.destroy();
        res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (error) {
        console.error('Error deleting grade:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const { GradeName } = req.body; // Assuming the grade has a name

        if (!GradeName) {
            return res.status(400).json({ error: 'Grade name is required' });
        }

        const newGrade = await Grade.create({ GradeName });
        res.status(201).json(newGrade);
    } catch (error) {
        console.error('Error creating grade:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
