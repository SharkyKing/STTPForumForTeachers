const express = require('express');
const router = express.Router();
const { Thread, Category, Grade, User, ThreadVote, Comment } = require('../../models');
const authenticateJWT = require('../../middlewares/authMiddleware');

// POST route to create a new thread
router.post('/', authenticateJWT, async (req, res) => {
    const { ThreadName, ThreadText, CategoryID, GradeID } = req.body;
    const UserID = req.user.id; 

    try {
        if (!ThreadName || !ThreadText || !CategoryID || !GradeID) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const category = await Category.findByPk(CategoryID);
        const grade = await Grade.findByPk(GradeID);
        const user = await User.findByPk(UserID);

        if (!category) return res.status(404).json({ error: "Category not found." });
        if (!grade) return res.status(404).json({ error: "Grade not found." });
        if (!user) return res.status(404).json({ error: "User not found." });

        const newThread = await Thread.create({
            ThreadName,
            ThreadText,
            CategoryID,
            GradeID,
            UserID,
            RelevancyCount: 0
        });

        res.status(200).json({ message: "Thread created successfully!", thread: newThread });
    } catch (error) {
        console.error('Error creating thread:', error);
        res.status(500).json({ error: "An error occurred while creating the thread." });
    }
});

router.post('/vote/:threadId', authenticateJWT, async (req, res) => {
    const threadId = req.params.threadId;
    const vote = req.body.vote;
    const userId = req.user.id;

    try {
        const [threadVote, created] = await ThreadVote.findOrCreate({
            where: {
                ThreadID: threadId,
                UserID: userId,
            },
            defaults: {
                Vote: vote, 
            },
        });

        if(!created){
            const oldVote = threadVote.Vote;
            console.log("OLD VOTE: ", oldVote);
            const thread = await Thread.findByPk(threadId);
            threadVote.Vote = vote;
            if(thread){
                if(oldVote === 0){
                    console.log("VOTE5: ", oldVote);
                    if(vote === - 1){
                        thread.RelevancyCount = thread.RelevancyCount + 1;
                        console.log("VOTE1: ", oldVote);
                    }
                    else{
                        thread.RelevancyCount = thread.RelevancyCount - 1;
                        console.log("VOTE44: ", oldVote);
                    }
                    await thread.save();
                }
                else if(oldVote === 1){
                    if(vote === -1){
                        thread.RelevancyCount = thread.RelevancyCount - 2;
                        console.log("VOTE3: ", oldVote);
                        await thread.save();
                    }
                    else{
                        thread.RelevancyCount = thread.RelevancyCount - 1;
                        threadVote.Vote = 0;
                        console.log("VOTE33: ", oldVote);
                        await thread.save();
                    }
                }
                else if(oldVote === -1){
                    if(vote === 1){
                        thread.RelevancyCount = thread.RelevancyCount + 2;
                        console.log("VOTE2: ", oldVote);
                        await thread.save();
                    }
                    else{
                        thread.RelevancyCount = thread.RelevancyCount + 1;
                        threadVote.Vote = 0;
                        console.log("VOTE22: ", oldVote);
                        await thread.save();
                    }
                }
            }
        }
        else{
            const thread = await Thread.findByPk(threadId);
            if(thread){
                if(vote === - 1){
                    thread.RelevancyCount = thread.RelevancyCount + 1;
                }
                else{
                    thread.RelevancyCount = thread.RelevancyCount - 1;
                }
                await thread.save();
            }
        }
        await threadVote.save();
        res.status(200).json({ message: 'Nothing changed!', threadVote });
    } catch (error) {
        console.error('Error upvoting thread:', error);
        res.status(500).json({ error: 'An error occurred while upvoting the thread.' });
    }
});


router.get('/', authenticateJWT, async (req, res) => {
    try {
        const ThreadsAll = await Thread.findAll({
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

router.get('/:id', authenticateJWT, async (req, res) => {
    const threadId = req.params.id;

    try {
        const thread = await Thread.findOne({
            where: { id: threadId },
            include: [
                { model: Category, attributes: ['CategoryName'] },
                { model: Grade, attributes: ['GradeName'] },
                { model: User, attributes: ['username'] } // Include user info if needed
            ]
        });

        if (!thread) {
            return res.status(404).json({ error: "Thread not found." });
        }

        res.status(200).json(thread);
    } catch (error) {
        console.error("Error fetching thread by ID:", error);
        res.status(500).json({ error: "An error occurred while fetching the thread." });
    }
});

router.get('/:threadId/comment', async (req, res) => {
    const { threadId } = req.params;

    try {
        // Fetch comments related to the given Thread ID
        const comments = await Comment.findAll({
            where: {
                ThreadID: threadId
            },
            include: [
                {
                    model: User, // Include User model to get user information
                    attributes: ['username'] // Specify attributes to return
                }
            ],
            order: [['createdAt', 'DESC']] // Optional: Order comments by creation date
        });

        res.status(200).json(comments); // Return the fetched comments
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: "An error occurred while fetching comments." });
    }
});

module.exports = router;
