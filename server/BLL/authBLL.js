const userModel = require('../models/UsersModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registers a new user by encrypting the password and saving the user data to the database.
const register = async (obj)=>{
    let users = await userModel.find();
    let user = await users.find(user => user.phoneNumber == obj.phoneNumber);
    console.log(user);
    if (user) {
        return "User already registered";
    } else {
    let { password } = obj;
    console.log(password);
    let incryptPass = await bcrypt.hash(password + process.env.SECRET_KEY_PASSWORD, 12);
    obj.password = incryptPass;
    let user = new userModel(obj);
    await user.save()
    return "User created successfully!";
    }
}

// * Authenticates a user by comparing the provided username and password with the stored credentials.
// If authentication succeeds, a JWT token is generated and returned.
const login = async (obj)=>{
    let users = await userModel.find();
    let user = await users.find(user => user.phoneNumber === obj.phoneNumber);
    let {userName} = user
    console.log(userName);
    if (!user) {
        return {msg:"User not found. please make sure you're registered and try again"};
    } else {
        let userHashed = user.password;
        let validatePass = await bcrypt.compare(obj.password + process.env.SECRET_KEY_PASSWORD, userHashed);
        if (!validatePass) {
            return {msg:"Wrong Password, please try again"};
        } else {
            let token = jwt.sign({ userId:user._id.toString()}, process.env.SECRET_TOKEN_KEY, {
                expiresIn: "24h"
            });
            return {msg: "logged-in",token: token, userId:user._id.toString(), userName:userName}
        }
    }
}


module.exports = {
    register,
    login
}