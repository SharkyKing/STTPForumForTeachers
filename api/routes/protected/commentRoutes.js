// routes/comments.js
const express = require('express');
const router = express.Router();
const { Comment, User, Thread } = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware');

// POST route to create a new comment
router.post('/', authenticateJWT, async (req, res) => {
    const { CommentText, ThreadID } = req.body;
    const UserID = req.user.id; // Get the authenticated user's ID

    try {
        if (!CommentText || !ThreadID) {
            return res.status(400).json({ error: "CommentText and ThreadID are required." });
        }

        const newComment = await Comment.create({
            CommentText,
            ThreadID,
            UserID, // Link the comment to the user
            RelevancyCount: 0 // Initial relevancy count
        });

        res.status(201).json({ message: "Comment created successfully!", comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ error: "An error occurred while creating the comment." });
    }
});

// PATCH route to update an existing comment
router.patch('/:commentId', authenticateJWT, async (req, res) => {
    const { commentId } = req.params;
    const { CommentText } = req.body;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        if (CommentText) {
            comment.CommentText = CommentText;
            await comment.save();
        }

        res.status(200).json({ message: "Comment updated successfully!", comment });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ error: "An error occurred while updating the comment." });
    }
});

router.delete('/:commentId', authenticateJWT, async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        // Optionally, check if the user is authorized to delete this comment
        // if (comment.UserID !== req.user.id) {
        //     return res.status(403).json({ error: "You are not authorized to delete this comment." });
        // }

        await comment.destroy();
        res.status(200).json({ message: "Comment deleted successfully!" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: "An error occurred while deleting the comment." });
    }
});

module.exports = router;
