
const express = require('express');
const userControllers = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get("/all", userControllers.getAllUsers);

router.post("/new", userControllers.register);
router.post("/login", userControllers.login);

router.get("/logout", userControllers.logOut);
router.get("/profile", isAuthenticated, userControllers.getProfile);

module.exports = router