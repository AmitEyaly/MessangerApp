const chatsModel = require('../models/ChatsModel')
const usersModel = require('../models/UsersModel')
const jwt = require("jsonwebtoken");
require("dotenv").config();

//* Retrieves chats posted by a specific user from the database.
const getChatListByUserId = async (token) => {
    try {
        let tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        console.log(tokenVerified);
        if (!tokenVerified) {
            return { msg: "please register/log in" };
        } else {
            //  Check if the token belongs to the specified user
            // if (tokenVerified._doc._id.toString() === userId) {
            let userById = await usersModel.findById(tokenVerified.userId)
            console.log(userById);
            // Retrieve chats posted by the user
            const chatIDsList = userById.chatsRelated || [];
            console.log(chatIDsList);
            if (chatIDsList.length === 0) {
                return { msg: "No chats found for this user" };
            }
            else {
                // Find chats by IDs posted by the user
                let chatList = await chatsModel.find({ _id: { $in: chatIDsList } });
                console.log(chatList);
                if (chatList) {
                    return chatList
                }
                else {
                    return { msg: 'no chats found' };
                }
            }
        }
        // else {
        //     return {msg:'unautorised request'};
        // }
    }
    catch (error) {
        console.error('Error:', error);
        return error.message;
    }
};


// Update the user's chatsRelated array
const updateChatsRealated = async (phoneNumber, newChat) => {

    let user = await usersModel.findOne({ phoneNumber: phoneNumber });
    if (!user) {
        return "Error: User not found";
    }
    else {

        // Add the new chat's _id to the user's chatsRelated array
        let chatIDsList = user.chatsRelated;
        console.log(chatIDsList);
        chatIDsList.push(newChat._id.toString());

        try {
            await usersModel.findOneAndUpdate(
                { phoneNumber: phoneNumber },
                { $set: { chatsRelated: chatIDsList } },
                { new: true }
            );
            console.log('chatsRealated Array updated succesfully');
        } catch (updateError) {
            return `Error updating user: ${updateError.message}`;
        }
    }
}


// Saves a new chat to the database and associates it with the users wich are chatMembers.
const newChat = async (token, obj) => {
    try {
        // Verify the token
        let tokenVerified;
        try {
            tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
        } catch (verifyError) {
            throw new Error("Error: please register/log in");
        }

        if (tokenVerified) {
            // Create a new chat

            let newChat = new chatsModel(obj);
            // Save the chat
            try {
                await newChat.save();
            } catch (saveError) {
                return `Error saving chat: ${saveError.message}`;
            }
            let chatMembers = obj.chatMembers
            for (let member of chatMembers) {
                console.log(`Updating chat member: ${JSON.stringify(member)}`);
                await updateChatsRealated(member.phoneNumber, newChat);
            }

            // let user = await usersModel.findById(userId);
            // if (!user) {
            //     return "Error: User not found";
            // }

            // // Add the new chat's _id to the user's chatsRelated array
            // let chatIDsList = user.chatsRelated;
            // chatIDsList.push(newChat._id.toString());


            // // Update the user's chatsRelated array
            // try {
            //     await usersModel.findOneAndUpdate(
            //         // { _id: tokenVerified._doc._id },
            //         { _id: userId },
            //         { $set: { chatsRelated: chatIDsList } },
            //         { new: true }
            //     );
            // } catch (updateError) {
            //     return `Error updating user: ${updateError.message}`;
            // }

            return "New chat created successfully!";

        } else {
            throw new Error("Error: Token verification failed");
        }
    } catch (error) {
        console.log(error);
        return `Unhandled error: ${error.message}`;
    }
}



//Updates details of a chat by its ID if the user is authorized
const updateChatById = async (token, updatedDetails, mongoId) => {
    try {
        let tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        if (!tokenVerified) {
            return { msg: "unauthorised request" };
        } else {
            //     //// Check if the token belongs to the specified user
            //     if (tokenVerified._doc._id == userId) {
            // Extract chat ID from updated details
            let chatId = mongoId
            // Find the chat by ID and ensure it belongs to the user
            let chat = await usersModel.findOne({ _id: tokenVerified.userId, chatsRelated: chatId });
            // If the chat is found, update its details
            if (chat) {
                let updatedChat = await chatsModel.findOneAndUpdate(
                    { _id: chatId },
                    { $push: { MessagesRelated: updatedDetails } },
                    { new: true }
                );
                // If the chat is updated successfully, return success message
                if (updatedChat) {
                    return { msg: "Chat updated successfully!" };
                }
                else {
                    return { msg: "update faild" }
                }
            }
            else {
                return { msg: 'Chat not found' }
            }
        }
        //     else {
        //         return "unauthorised request";
        //     }
        // }
    } catch (error) {
        console.log(error);
        return error.message;
    }

}

//Deletes a chat by its ID and Remove the chat ID from the user's database- if the user is authorized.
// const deleteChatById = async (token, userId, chatId) => {
const deleteChatById = async (userId, chatId) => {
    try {
        // let tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        // if (!tokenVerified) {
        //     return "Error: please register/log in";
        // } else {
        // // Check if the token belongs to the specified user
        // if (tokenVerified._doc._id == userId) {
        //     // Find the user by ID and ensure the chat belongs to the user
        // let chat = await usersModel.findOne({ _id: tokenVerified._doc._id, chatsRelated: chatId });
        if (chat) {
            // Delete the chat from the database
            const deletedchat = await chatsModel.findByIdAndDelete(chatId);
            // Remove the chat ID from the user's chatsRelated array
            const indexToRemove = chat.chatsRelated.indexOf(chatId);
            const updatedChatsRelated = chat.chatsRelated.splice(0, indexToRemove);
            // Update the user's chatsRelated array
            const updateUsersChatList = await usersModel.findOneAndUpdate(
                // { _id: tokenVerified._doc._id },
                { _id: userId },
                { $set: { chatsRelated: updatedChatsRelated } },
                { new: true }
            );;
            // If the chat is deleted and the user is updated successfully, return success message
            if (deletedchat && updateUsersChatList) {
                return "Chat deleted successfully!";
            }
            else {
                return "faild to delete"
            }
        }
        //         else {
        //             return "chat not found, cannot delete other users chats";
        //         }
        //     }
        // }
    } catch (error) {
        console.log(error);
        return error.message;
    }
}
module.exports = { getChatListByUserId, newChat, updateChatById, deleteChatById }