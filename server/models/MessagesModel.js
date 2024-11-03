const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
    fullName:String,
    users:Array,
    MessagesRelated: [{
        senderID: Number, 
        reciverID: Number,
        time: String,
        contant: String
    }] 
}
);

const MessagesModel = new mongoose.model("Messages" , MessagesSchema , "Messages");

module.exports = MessagesModel;