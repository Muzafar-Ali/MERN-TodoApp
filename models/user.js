const mongoose = require('mongoose');

//create user Schema
const userSchema = new mongoose.Schema({
        
    name:{
        type: String,
        required:true,
    },  
    email:{
        type: String,
        unique: true,
        required:true,
    },
    password:{
        type: String,
        required:true,
        select: false //  password will not be accessable/visible when we request user data 
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

//created User Model
const User = mongoose.model("User", userSchema);

module.exports = User;