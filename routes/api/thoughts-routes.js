// Require express router
const router = require('express').Router();

const {addReactions, removeReactions, getAllThoughts, getThoughtsById, addThoughts, removeThoughts } = require('../../controllers/Thoughts-controller');

// Set up GET all and POST at /api/user
router
  .route('/')
  .get(getAllThoughts)

router
 .route('/:id')
 .get(getThoughtsById)
 
// -- Directs to: /api/thoughts/:userId <POST>
router.route('/:userId').post(addThoughts);

// /api/thoughts/<userId>/<thoughtsId>
router.route('/:UserId/:thoughtsId')
.put(addReactions)
.delete(removeThoughts);

router.route('/:userId/:thoughtsId/:reactionId').delete(removeReactions);

// Module export router
module.exports = router; 