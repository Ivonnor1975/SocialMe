// Require express router
const router = require('express').Router();

//Import functionalliy to hook it to routes
const {
  getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } = require('../../controllers/user-controller');



// Set up GET all and POST at /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);


// Module export router
module.exports = router; 