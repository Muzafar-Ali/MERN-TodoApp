const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const sendTokenCookie = (user, res, statusCode, message ) =>{
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                           
    res.status(statusCode)
    .cookie("token", token,{ //we are sending cookie as user gets logged in at the same time when it regiseters
        httpOnly : true,
        maxAge: 900000, // 15 * 60 * 1000 = 900,000ms = 15 minutes
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", 
        secure: process.env.NODE_ENV === "Development" ? false : true
    
    }).json({
        success: true, 
        message,
    });
}


module.exports = {
    sendTokenCookie,
}