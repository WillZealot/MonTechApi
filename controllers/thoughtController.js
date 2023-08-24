const Thought = require('../models/thought');
const User = require('../models/user');

module.exports = {
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    async getSingleThought(req, res) {
      try {
        const thoughtId = req.params.thoughtId;
        const thought = await Thought.findOne({ _id: thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    async createThought(req, res) {
        try {
          const newThoughtData = req.body;
          const createdThought = await Thought.create(newThoughtData);
      
          await User.findOneAndUpdate(
            { username: req.body.username }, // Find the user by username
            { $push: { thoughts: createdThought._id } }, // Push the thought's _id to user's thoughts array
            { new: true }
          );
      
          res.json(createdThought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
  
    async updateThought(req, res) {
      try {
        const thoughtId = req.params.thoughtId;
        const updatedThoughtData = req.body;
        const updatedThought = await Thought.findOneAndUpdate(
          { _id: thoughtId },
          updatedThoughtData,
          { new: true }
        );
  
        if (!updatedThought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(updatedThought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    async deleteThought(req, res) {
      try {
        const thoughtId = req.params.thoughtId;
        const deletedThought = await Thought.findOneAndDelete({ _id: thoughtId });
  
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }

        await User.findOneAndUpdate(
            { username: req.body.username }, // Find the user by username
            { $pull: { thoughts: deletedThought._id } }, // Push the thought's _id to user's thoughts array
            { new: true }
          );
  
        res.json({ message: 'Thought deleted' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async createReaction(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
          const newReaction = req.body;
    
          const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $push: { reactions: newReaction } },
            { new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    
      async deleteReaction(req, res) {
        try {
          const thoughtId = req.params.thoughtId;
          const reactionId = req.params.reactionId;
    
          const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $pull: { reactions: { _id: reactionId } } },
            { new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      }
  };