const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const verifyToken = require("../middlewares/authMiddleware");

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/verify-token", verifyToken, (req, res) => {
    res.status(200).json({ valid: true, user: req.user });
  });
  

module.exports = router;
