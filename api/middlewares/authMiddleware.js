// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const {User} = require('../models/')

const authenticateJWT = async (req, res, next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(403).json({ error: "Access denied, token missing!" });
    }

    await jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(498).json({ error: "Invalid token!" });
        }

        try {
            const dbUser = await User.findOne({ where: { id: user.id } }); 
            
            if (!dbUser) {
                return res.status(404).json({ error: "User not found!" });
            }
            
            req.user = dbUser; 
            next(); 
        } catch (dbError) {
            console.error("Database error:", dbError);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};

module.exports = authenticateJWT;
