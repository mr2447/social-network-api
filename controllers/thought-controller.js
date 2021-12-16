const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts using the find all method
    getAllThought(req, res) {
        Thought.find({})
        .populate(
            {
                path: 'userId',
                select: '-__v'
            }
        )
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //GET a single thought bi id
    getThoughtById({params}, res) {
        console.log("this is the params:", params)
        Thought.findOne({ _id: params.thoughtId })
        .populate(
            {
                path: 'userId',
                select: '-__v'
            }
        )
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought find with this id!'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //add thought to user
    addThought( { params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then((data) => {
            console.log(data)
            console.log(data._id)
            console.log('this is params: ', params)
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: data._id}},
                { new: true, runValidators: true }
            );
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log("something went wrong")
            console.log(err)
            res.json(err)
        })
    },
    //Update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        }) 
        .catch(err=> {
            console.log(err)
            res.status(400).json(err)
        })
    },
    //remove thought
    removeThought( {params}, res) {
        console.log("this is params.thoughtId", params.thoughtId)
        console.log("this is params.userId",params.userId)
        console.log("this is params.thoughtText", params.thoughtText)
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(deleteThought => {
            if(!deleteThought) {
                return res.status(404).json({ message: "No thoughts with this id"});
            }
            // return console.log(`thought with id ${params.thoughtId} was deleted.`)
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$pull: { thoughts: params.thoughtId}},
                {new: true}
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json( {message: 'No user found with this id'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    //add reaction
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate(
           { _id: params.thoughtId},
           {$push: {reactions: body}},
           {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "No user thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err=> {
            console.log(err)
            res.json(err)
        })
    },
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {replyId: params.replyId}}},
            {new: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found at this id'});
                return
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log("This is the err", err)
            res.json(err)
        })
    }
}

module.exports = thoughtController