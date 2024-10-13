// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware')

router.post("/register", async (req, res) => {
    const { FirstName, LastName, Email, Password, Username } = req.body;

    const RoleName = "User";
    const RoleUser = await Role.findOne({ where: {RoleName}});
    if (!RoleUser) {
        return res.status(400).json({ error: "Failed to attach role." });
    }
    const RoleID = RoleUser.id;

    try {
        const existingEmail = await User.findOne({ where: { Email } });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const existingUserName = await User.findOne({ where: { Username } }); 
        if (existingUserName) {
            return res.status(400).json({ error: "Username already exists." });
        }

        const newUser = await User.create({ FirstName, LastName, Email, Password, Username, RoleID:RoleID });
        res.status(201).json({ message: "User created", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isValidPassword = bcrypt.compareSync(password, user.Password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, role: user.RoleID }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 
        });

        res.status(200).json({ message: "User logged in successfully", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/logout", authenticateJWT, (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

router.get("/auth", authenticateJWT, (req, res) => {
    res.json({ message: 'User is authenticated', user: req.user });
});


module.exports = router;
