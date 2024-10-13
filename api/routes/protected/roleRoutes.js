const express = require('express');
const router = express.Router();
const { Role } = require('../../models'); 
const authenticateJWT = require('../../middlewares/authMiddleware'); 

router.patch('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;
        const { RoleName } = req.body; // Assuming only RoleName is editable

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        if (RoleName) {
            role.RoleName = RoleName;
        }

        await role.save();
        res.status(200).json(role);
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findByPk(id);

        if (!role) {
            return res.status(404).json({ error: 'Role not found' });
        }

        await role.destroy();
        res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const { RoleName } = req.body; // Assuming the role has a name

        if (!RoleName) {
            return res.status(400).json({ error: 'Role name is required' });
        }

        const newRole = await Role.create({ RoleName });
        res.status(201).json(newRole);
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles); 
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
