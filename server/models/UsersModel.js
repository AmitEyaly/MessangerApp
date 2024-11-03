const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    "fullName":
    {type:String, required: true},
    "userName": {type:String, required: true},
    "phoneNumber":{type:Number, required: true},
    "password": {type:String, required: true},
    "chatsRelated": Array,
    "contacts": Array  
}
);

const UserModel = new mongoose.model("User" , UserSchema , "Users");

module.exports = UserModel;