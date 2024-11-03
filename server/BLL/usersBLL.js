const usersModel = require('../models/UsersModel')
const mobileContacts = require('../DL/usersMobileContacts')
const jwt = require('jsonwebtoken')
require("dotenv").config();


// Retrieves all users from the database if a valid JWT token is provided.
// const getAllUsers = async (token) => {
const getAllUsers = async () => {
    try {
        // if (token) {
        //     let tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        //     if (!tokenVerified) {
        //         return "Error: please register/log in";
        //     } else {
        let allUsers = await usersModel.find({});
        return allUsers;
        // }
        // }
        // else {
        //     return 'no token provided'
        // }
    } catch (error) {
        console.log(error.message);
        return error.message;
    }

};

// Retrieves users from the database and filter by userId if a valid JWT token is provided.
const getUserById = async (token, id) => {
    try {
        let tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        if (!tokenVerified) {
            return "Error: please register/log in";
        } else {
            let usersById = await usersModel.findOne({ phoneNumber: id });
            if (usersById) {
                return usersById
            }
            else {
                return 'User not found';
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        return error.message;
    }
};

// Retrieves users from the database and filter by user's list of mobile contacts, if a valid JWT token is provided.
const getUserMobileContacts = async (token) => {
    try {
        let tokenVerified = jwt.verify(token, process.env.SECRET_TOKEN_KEY)
        if (!tokenVerified) {
            throw new Error("Error: please register/log in");
        } else {
            const contacts = await mobileContacts.getData();
            const contactsArray = contacts.usersMobileSavedContacts
            let users = await usersModel.find({});
            if (users && contactsArray.length > 0) {
                let filteredContacts = users.filter(user => {
                    const userPhoneNumber = String(user.phoneNumber); // Ensure user's phone number is a string
                    const isInContacts = contactsArray.includes(userPhoneNumber);
                    return isInContacts
                })
                
                return filteredContacts
            }
            else {
                throw new Error('Error: no contacts found')
            }
        }
    } catch (error) {
        console.error('Error:', error.message);
        return error.message;
    }
};




module.exports = { getAllUsers, getUserById, getUserMobileContacts }