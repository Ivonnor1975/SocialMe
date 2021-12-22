// Require Thoughts and Users Models
const { User} = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
    // populate users thoughts
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },    
  // get one User by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({path: 'thoughts', select: '-__v'})
    .populate({path: 'friends', select: '-__v'})
    .select('-__v')
    .then(dbData => {
        // If no user is found, send 404
        if (!dbData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// create User
createUser({ body }, res) {
    User.create(body)
      .then(dbData => res.json(dbData))
      .catch(err => res.status(400).json(err));
  },

// update user by id
updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.status(400).json(err));
  },

// delete user
deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbData);
      })
      .catch(err => res.status(400).json(err));
  },

//add a friend
addFriend({ params }, res) {
      //Check to see if friendId exists first
      User.findById({ _id: params.friendId })
      .then(dbFriend => {
          if(!dbFriend) {
              res.status(404).json({ 'message': `There is no user with id ${params.friendId}`});
              return;
          }
          //Friend exists - now check to see if user exists
          User.findByIdAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId }}, { new: true })
          .then(dbData => {
              if(!dbData) {
                  res.status(404).json({ 'message': `There is no user with id ${params.userId}`});
                  return;
              }
              res.json(dbData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
  },

//delete a friend
removeFriend({ params }, res) {
    //Check to see if friendId exists first
    User.findById({ _id: params.friendId })
    .then(dbFriend => {
        if(!dbFriend) {
            res.status(404).json({ 'message': `There is no user with id ${params.friendId}`});
            return;
        }
        User.findOneAndUpdate({_id: params.userId}, {$pull: { friends: params.friendId}}, {new: true})
          .populate({path: 'friends', select: '-__v'})
          .select('-__v')
          .then(dbData => {
              if(!dbData) {
                  res.status(404).json({ 'message': `There is no user with id ${params.userId}`});
                  return;
              }
              res.json(dbData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err);
      });
}
}

// Export module user controller
module.exports = userController;