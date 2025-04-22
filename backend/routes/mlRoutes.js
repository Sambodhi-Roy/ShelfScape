const express = require('express');
const router = express.Router();
const { userRating, getRecomendedBooks } = require('../controllers/mlController');
const verifyToken = require("../middlewares/authMiddleware");

router.post('/user-rating',userRating);
router.get('/recomonded-books', getRecomendedBooks);


module.exports = router;
