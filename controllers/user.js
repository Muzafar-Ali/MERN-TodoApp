const User = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { sendTokenCookie } = require("../utils/features");

exports.getAllUsers = async(req, res)=>{

};

exports.login = async(req, res)=>{
    
    const {email, password} = req.body;
                                            // select is added as we have used select false in user schema
    const user = await User.findOne({ email }).select("+password");

    if(!user)
        return res.status(404).json({
            success: false,
            message: 'Invalid Email or Password'
        });

    const matchPassword = await bcrypt.compare(password, user.password);

    if(!matchPassword)
        return res.status(404).json({
            success: false,
            message: 'Invalid Email or Password'
        });

    sendTokenCookie(user, res, 200, `Welcome ${user.name}`)

}

exports.register = async(req, res)=>{
    const {name, email, password} = req.body;
        
    let user = await User.findOne({email});
    
    if(user)
        return res.status(404).json({
            success: false,
            message: 'You are already registered'
        });
    
    const hashedPassword = await bcrypt.hash(password,10);

    //create user if not registered
    user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    
    //we are sending as user gets logged in at the same time when it regiseters 
    sendTokenCookie(user, res, 201, "Registered Successfuly" );
}

exports.getProfile = async(req, res)=>{
    
    res.status(200).json({
        success: true,
        user: req.user, // user data is set in req.body inside isAuthenticated middleware
    })
}

exports.logOut = (req, res)=>{
    
                            //make token value empty and remove cookie 
    res.status(200)
    .cookie("token", "", { 
        expires : new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", 
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
        success: true,
        user: req.user,
        message:" You are logged out",
    })
}

