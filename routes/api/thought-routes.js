const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// set up get all route for /api/thoughts/
router.route('/').get(getAllThought)

//set up get one, update route for /api/thoughts/:<thoughtId>
router.route('/:thoughtId').get(getThoughtById).put(updateThought)

// set up create one thought for /api/thoughts/:<userId>
router.route('/:userId').post(addThought);

// set up add reply for /api/thoughts/:<userId>/:<thughtId>/:<replyId>
router.route('/:userId/:thoughtId/:replyId').put(removeReaction)

//set up remove thought or reaction for /api/thoughts/:<userId>/:<thoughtId>/:
router.route('/:userId/:thoughtId').delete(removeThought).put(addReaction);

module.exports = router;
