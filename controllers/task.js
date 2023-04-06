const { json } = require("express")
const Task = require("../models/tasks")
const { ErrorHandler } = require("../middlewares/error")

exports.createTask = async(req, res, next) =>{
    const {title, description, } = req.body

    await Task.create({
        title,
        description,
        user: req.user,
    })

    res.status(201).json({
        success: true,
        message: "Task added successfully"
    })
}

// get tasks added by specific user
exports.getMyTask = async (req, res, next) =>{

    const userId = req.user._id;
      
    // will match user id inside task data and will return array 
    const tasks = await Task.find({user: userId});
    res.status(200).json({
        success: true,
        tasks,
    })
}

exports.updateTask = async (req, res, next)=>{
    
    const {id} = req.params

    const task = await Task.findById(id)
    
    // Used error handling middleware
    if(!task) return next(new ErrorHandler("Task not found", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
        success: true,
        message: "Task updated"
    })
}

exports.deleteTask = async (req, res, next)=>{
    
    const {id} = req.params
    const task = await Task.findById(id)
    
    if(!task) return next( new ErrorHandler("Task id Invalid",404));
    
    await task.deleteOne();
    
    res.status(200).json({
        success: true,
        message: "Task Deleted"
    })
}