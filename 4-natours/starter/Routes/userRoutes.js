const express = require('express');
const userController = require('../Controllers/userController');

const { allUsers, createUser, getUser, updateUser, deleteUser } =
  userController;

//ROUTER
const router = express.Router();
//ROUTES
router.route('/').get(allUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
