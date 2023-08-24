const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteSingleUser,
  createUsersFriend,
  deleteUsersFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteSingleUser);

router.route('/:userId/friends/:friendId').post(createUsersFriend).delete(deleteUsersFriend)

module.exports = router;

//`64e7bc9bee7dd74695734b48 donaldson`

//`64e554eb311863b715a13793 sophia friend`