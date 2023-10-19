const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controller/user-controller.js');

router.route('/').get(getUser).post(createUser);

// 
router
  .route('/:Id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);


router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
