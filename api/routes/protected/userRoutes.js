// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { User, Role } = require('../../models'); // Import the User model
const db = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware'); // Middleware for JWT authentication
const { where } = require('sequelize');

// Route to get a user by ID
router.get('/:id', authenticateJWT, async (req, res) => {
    const userId = req.params.id;

    try {
        // Fetch user from database
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['Password'] } // Exclude sensitive fields like Password
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user); // Send user data back to the client
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.patch('/:id', authenticateJWT, async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body; // The data to update

    try {
        // Find the user first
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user
        await user.update(updateData); // Use Sequelize's update method

        // Optionally, exclude sensitive fields when sending the response back
        const updatedUser = await User.findByPk(userId, {
            attributes: { exclude: ['Password'] } // Exclude sensitive fields
        });

        res.status(200).json(updatedUser); // Send updated user data back to the client
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const Users = await User.findAll({
            include: [
                {
                    model: Role,
                    attributes: [] 
                }
            ],
            attributes: {
                include: [   
                    [db.sequelize.col('Role.RoleName'), 'RoleName']  
                ]
            },
            where: {
                id: { [db.Sequelize.Op.ne]: req.user.id }  // Exclude the current user (not equal operator)
            }
        });

        res.status(200).json(Users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
