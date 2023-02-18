const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    //get thought by ID
    getThoughtByID({ params }, res) {
        Thought.findOne(
            { _id: params.id }
        ).then((thought) => {
            !thought ? res.status(404).json({message: 'No thought by ID'}) : res.json(thought);
    
        }).catch((err) => res.status(500).json(err));
    },
    //post new thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userID },
                { $push: { thoughts: thought._id}},
                {new: true}
            )
        }).then(userData => res.json(userData))
        .catch((err) => res.status(500).json(err))
    },
    //update thought by ID
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((thought) => {
            !thought ? res.status(404).json({message: 'No thought by this ID'}) : res.json(thought);
        }).catch((err) => res.status(500).json(err)); 
    },
    //delete thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id})
        .then((thought) => {
            !thought ? res.status(404).json({message: 'No thought by this ID'}) : res.json(thought);
        }).catch((err) => res.status(500).json(err)); 
    },
    //add reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body }},
            { runValidators: true, new: true }
        ).then((thought) => !thought ? res.status(404).json({ message: 'Reaction not added' }) : res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true }
        ).then((thought) => !thought ? res.status(404).json({ message: 'Cannot delete' }) : res.json(thought))
        .catch((err) => res.status(500).json(err))
    }, 
 };

 module.exports = thoughtController;