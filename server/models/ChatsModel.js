const mongoose = require('mongoose');

const ChatsSchema = new mongoose.Schema({
    'chatId': {
        type: String,
        required: true
    },
    'chatMembers': {
        type: Array,
        required: true
    },
    'MessagesRelated': {
        type: Array,
        required: true
    }
}
);

const ChatsModel = new mongoose.model("Chat" , ChatsSchema , "Chats");

module.exports = ChatsModel;