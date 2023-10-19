const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controller/thought-controller.js');

router.route('/').get(getThought).post(createThought);


router
  .route('/:Id')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);


router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(deleteReaction);

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
