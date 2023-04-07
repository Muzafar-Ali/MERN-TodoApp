const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

//import user routers
const userRouters = require('./routes/user');
const taskRouters = require('./routes/task');
const { errorMiddlewares } = require('./middlewares/error');

const app = express();

//using middlewares 
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FROTNEND_URL], // will accept req from this url only
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods will be alowed
    credentials: true,  // this will not stop cookies / headres to be sent to front end 
}));

//using users routes
app.use("/api/v1/users", userRouters)
app.use("/api/v1/task", taskRouters)

//using error middlewares
app.use(errorMiddlewares);

module.exports = app;