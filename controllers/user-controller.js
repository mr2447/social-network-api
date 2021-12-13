const { User } = require('../models')

const userController = {
    //get all uers
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //get a single user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            //if no user is found, send 404
            if(!dbUserData) {
                res.status(404).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //create user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err))
    },
    //update a user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete a user by id
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err))
        /*############BONUS: Remove a user's associated thoughts when deleted.*/
    },
    //add a new freind to this user's freind list
    addFriend({ params, body}, res) {
        // User.create(body)
        console.log(body)
        // .then(({_id})=> {
        //     console.log(_id)
        //     return User.findOneAndUpdate(
        //         { _id: params.friendId},
        //         { $push: { friends: _id }},
        //         { new: true, runValidators: true }
        //     );
        // })
        // .then(dbUserData => {
        //     if(!dbUserData) {
        //         res.status(404).json({message: 'No user found with this id!'});
        //         return;
        //     }
        //     res.json(dbPizzaData);
        // })
        // .catch(err=> {
        //     console.log("Something went wrong")
        //     res.json(err)
        // })
    },


}

module.exports = userController

