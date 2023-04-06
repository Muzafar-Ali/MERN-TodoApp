const mongoose = require('mongoose');

//create user Schema
const taskSchema = new mongoose.Schema({
        
    title:{
        type: String,
        required:true,
    },  
    description:{
        type: String,
        required:true,
    },
    isCompleted:{
        type: Boolean,
        default: false
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

//created User Model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;