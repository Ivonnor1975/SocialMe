// Require express router
const router = require('express').Router();

const {addReactions, removeReactions, getAllThoughts, getThoughtsById, addThoughts,updateThoughts, removeThoughts } = require('../../controllers/Thoughts-controller');

// Set up GET all at /api/thoughs
router
  .route('/')
  .get(getAllThoughts)

  // use though id to get or delete one thought
router
 .route('/:id')
 .get(getThoughtsById)
 .put(updateThoughts)

//create a though and link it to user's thoughts
router.route('/:userId').post(addThoughts);

//delete a though and info in User as well. 
router.route('/:thoughtId/:userId')
.delete(removeThoughts)


// /api/thoughts/<userId>/<thoughtsId>
router.route('/:UserId/:thoughtsId')
.delete(removeThoughts);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.put(addReactions)

// /api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReactions);

// Module export router
module.exports = router; 