const router = require('express').Router();

const {
    getAllUser, 
    createUser,
    getUserById,
    updateUser,
    deleteUser
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

//sset up add new freind to a user's friend list
router.route()

module.exports = router;
