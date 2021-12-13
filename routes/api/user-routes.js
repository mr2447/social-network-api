const router = require('express').Router();

const {getAllUser} = require('../../controllers/user-controller');

//set up Get all and Post at /api/users

router.get.router('/')
.get(getAllUser);

module.exports = router;
