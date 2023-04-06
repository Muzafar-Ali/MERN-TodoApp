
const express = require('express');
const taskControllers = require('../controllers/task');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post("/new", isAuthenticated, taskControllers.createTask)
router.get("/mytasks", isAuthenticated, taskControllers.getMyTask)

router.route("/:id")
.put( isAuthenticated, taskControllers.updateTask)
.delete( isAuthenticated, taskControllers.deleteTask);



module.exports = router