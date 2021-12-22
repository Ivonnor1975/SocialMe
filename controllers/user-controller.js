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
  }
}

// Export module user controller
module.exports = userController;