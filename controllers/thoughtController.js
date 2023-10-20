const Thought = require("../models/Thought");
const User = require("../models/User");

//get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// get thought by id
const getThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (thought) {
      res.json(thought);
    } else {
      res.json({ message: "Thought doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// create a thought
const createThought = async (req, res) => {
  try {
    const { thoughtText, userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      const createdThought = await Thought.create({
        thoughtText,
        username: user.username,
        reactions: [],
      });
      if (createdThought) {
        user.thoughts.push(createdThought._id);
        const updatedUser = await user.save();
        res.json(updatedUser);
      } else res.json({ message: "Thought not found" });
    } else res.json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// update thought by id
const updateThought = async (req, res) => {
  try {
    const { thoughtText } = req.body;
    const thought = await Thought.findById(req.params.id);
    if (thought) {
      thought.thoughtText = thoughtText;
      const updatedThought = await thought.save();
      res.json(updatedThought);
    } else res.json({ message: "Thought not found" });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// delete a though by id
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({
      _id: req.params.id,
    });
    
    if (deletedThought) {
      const usrRes = await User.find({ username: deletedThought.username });
      const user = usrRes[0];
    
      if (user) {
        const idx = user.thoughts.indexOf(req.params.id);
        if (idx) {
          user.thoughts.splice(idx, 1);

          const updatedUser = await user.save();
          res.json({ message: "Thought deleted successfully", updatedUser});
        }
      } else res.json({message:"user not found with username:"+user.username})
    } else {
      res.json({ message: "Thought doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// Create reaction
const addReaction = async (req, res) => {
  const {reactionBody} = req.body
  const thoughtId = req.params.thoughtId

  const thought = await Thought.findById(thoughtId)
  if(thought){
     thought.reactions.push({reactionBody, username:thought.username})
     const updatedThought = await thought.save()
     res.json(updatedThought)
    
  } else {
    res.json({message:"thought doesn't exist" })
  }

};

// Find reaction and delete
const deleteReaction = ({ params }, res) => {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  getAllThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
