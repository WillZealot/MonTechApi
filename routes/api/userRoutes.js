const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteSingleUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteSingleUser);

module.exports = router;