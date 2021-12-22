// Require Thoughts and Users Models
const { User, Thoughts } = require('../models');

const thoughtsController = {
   // get all thoughts
    getAllThoughts(req, res) {
      Thoughts.find({})
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one User by id
  getThoughtsById({ params }, res) {
      Thoughts.findOne({ _id: params.id })
      .then(dbData => {
          // If no Thought is found, send 404
          if (!dbData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
          }
          res.json(dbData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

  // Create a new thought
   addThoughts({ params, body }, res) {
        Thoughts.create(body)
          .then(({ _id }) => {
            //Insert the thought into the User's thoughts 
              return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbData => {
            if (!dbData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbData);
          })
          .catch(err => res.json(err));
      },
// update a thought by id
updateThoughts({ params, body }, res) {
  Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Thoughts found with this id!' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => res.status(400).json(err));
},

removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtId})
      .then(deletedth => {
        if (!deletedth) {
          return res.status(404).json({ message: 'No thoughts with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId}},
          { new: true }
        );
      })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.json(err));
  },

//add reactions
addReactions({ params, body }, res) {
  Thoughts.findOneAndUpdate(
    { _id: params.thoughtsId },
    { $push: { reactions: body } },
    { new: true }
  )
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => res.json(err));
},
// remove reactions
removeReactions({ params }, res) {
  Thoughts.findOneAndUpdate(
    { _id: params.thoughtsId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then(dbData => res.json(dbData))
    .catch(err => res.json(err));
}
}
// Export module thought controller
module.exports = thoughtsController;