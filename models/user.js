const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: "username is required",
        unique: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: "email is required",
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "thought",
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
    ],

},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    });

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});    

const user = model('user', userSchema);

module.exports = user;