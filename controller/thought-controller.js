const { thought, user, reaction } = require('../models');

module.exports = {
    // Get all user
    async getThought(req, res) {
        try {
            const thoughts = await thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a user
    async getSingleThought(req, res) {
        try {
            const thoughts = await thought.findOne({ _id: req.params.Id })
                .select('-__v');

            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a thought
    async createThought(req, res) {
        try {
            const thoughtData = await thought.create(req.body);
            console.log(req.body);
            console.log(req.body.username);
            const userData = await user.findOneAndUpdate(
                {username: req.body.username },
                { $push: { thoughts: thoughtData._id } },
                { new: true }
                )
            if (!userData) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteThought(req, res) {
        try {
            const thoughtData = await thought.findOneAndDelete({ _id: req.params.Id });
            // never use findoneandremove
            if (!thoughtData) {
                res.status(404).json({ message: 'No Thought with that ID' });
            }
            const userData = await user.findByIdAndUpdate(
                { username: thoughtData.username },
                { $pull: { thoughts: thoughtData._id } },
                { new: true })
            if (!userData) {
                res.status(404).json({ message: 'No User with that ID' });
            }
            res.json({ message: 'user and thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateThought(req, res) {
        try {
            const thoughtData = await thought.findOneAndUpdate(
                { _id: req.params.Id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughtData) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const addReaction = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } }, //req.body bc we throw everything
                // will not allow repeat, and push will keep on adding to it (duplicate)
                // good to fight against bad algos
                { runValidators:true, new: true }
            )

            if (!addReaction) {
                res.status(404).json({ message: 'No thought with this id!' });
            }
        } catch (err) {
            res.status(500).json(err);

        }
    },
    async deleteReaction(req, res) {
        try {
            const deleteThought = await thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId} } },
                { runValidators:true, new: true }
            )

            if (!deleteThought) {
                res.status(404).json({ message: 'No thoughts with this id!' });
            }
        } catch (err) {
            res.status(500).json(err);

        }
    }
};

