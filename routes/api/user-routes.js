const router = require('express').Router();

const {
    getAllUser, 
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

//set up Get all and Post at /api/users
router
.route('/')
.get(getAllUser)
.post(createUser);

//set up Get one, Put, and delete at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

//set up add new freind to a user's friend list at /appi/users/:id/friends/:freindId
router.route('/:id/friends/:friendId')
.put(addFriend)
.delete(removeFriend);


module.exports = router;
