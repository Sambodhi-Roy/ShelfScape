const User = require('../model/User');
const generateToken = require('../utils/generateToken');
const axios = require('axios');

// @desc Submit user ratings and get recommendations
exports.userRating = async (req, res) => {
    const { ratings } = req.body;

    console.log("Incoming request data:", ratings);

    if (!ratings) {
        return res.status(400).json({
            message: 'Select books first'
        });
    }

    const updatedRatings = {};
    for (const book in ratings) {
        updatedRatings[book] = ratings[book] * 2;
    }

    console.log("Adjusted ratings for ML model:", updatedRatings);

    try {
        console.log("Sending to ML server...");
        const recommend = await axios.post('http://127.0.0.1:5000/recommend', updatedRatings);
        
        // Debug logs - ADDED HERE
        console.log("Full Axios response:", {
            status: recommend.status,
            headers: recommend.headers,
            config: recommend.config
        });
        console.log("ML Server data response:", recommend.data);
        
        if (!recommend.data || recommend.data.length === 0) {
            console.warn("ML server returned empty recommendations");
            return res.status(404).json({
                message: 'No recommendations found'
            });
        }

        return res.status(200).json({
            data: recommend.data
        });

    } catch (error) {
        console.error("Error in ML model call:", {
            message: error.message,
            response: error.response?.data,
            stack: error.stack
        });
        
        return res.status(500).json({
            message: 'Failed to get recommendations',
            error: error.response?.data || error.message
        });
    }
};



// @desc Login user
exports.getRecomendedBooks = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: 'user not found.please register first'
        })
    }

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });

    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
