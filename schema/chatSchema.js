const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const chatSchema = new mongoose.Schema({

    teamName: {
        type: String,
        required: true
    },
    messages: {
        type: [
            {
                time: Number,
                message: String,
                sender: Boolean
            }
        ]
    },
    adminUnread: {
        type: Number,
        default: 0
    },
    userUnread: {
        type: Number,
        default: 0
    }

});

chatSchema.plugin(passportLocalMongoose);
chatSchema.plugin(findOrCreate);

const Chat = new mongoose.model('Chat', chatSchema);

module.exports = Chat;
