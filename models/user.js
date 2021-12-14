
const { Schema, model } = require('mongoose');

const dateFormat = require('../utils/dateFormat')

function validator (email) {
    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
}

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator, message: `Not a valid email address!`
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: this
        }
    ]
},
{   
    toJSON: {
        virtuals: true,
        getters: true
    },
    /*####*/id: false
});

//get total count of freind and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
    // return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
});

//create the User model using the UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;