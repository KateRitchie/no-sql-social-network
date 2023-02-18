const router = require('express').Router();

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController')

// /api/users GET POST
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId GET PUT DELETE
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId POST DELETE
router.route('/:id/friends/:friendsId').post(addFriend).delete(removeFriend);

module.exports = router;