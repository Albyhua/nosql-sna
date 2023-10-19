const { thought, user, reaction } = require('../models');

module.exports = {
    // Get all user
    async getUser(req, res) {
        try {
            const users = await user.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a user
    async getSingleUser(req, res) {
        try {
            const userData = await user.findOne({ _id: req.params.Id })
                .select('-__v').populate("friends").populate("thoughts");

            if (!userData) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const userData = await user.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const userData = await user.findOneAndDelete({ _id: req.params.Id });
            // never use findoneandremove
            if (!userData) {
                res.status(404).json({ message: 'No User with that ID' });
            }

            await thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'user and thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const userData = await user.findOneAndUpdate(
                { _id: req.params.Id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!userData) {
                res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const addFriend = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } }, // will not allow repeat, and push will keep on adding to it (duplicate)
                    // good to fight against bad algos
                { runValidators:true, new: true }
            )

            if (!addFriend) {
                res.status(404).json({ message: 'No user with this id!' });
            }
        } catch (err) {
            res.status(500).json(err);

        }
    },
    async deleteFriend(req, res) {
        try {
            const deleteFriend = await user.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } }, 
                { runValidators:true, new: true }
            )

            if (!deleteFriend) {
                res.status(404).json({ message: 'No user with this id!' });
            }
        } catch (err) {
            res.status(500).json(err);

        }
    }
};

