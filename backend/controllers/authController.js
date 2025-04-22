const User = require('../model/User');
const generateToken = require('../utils/generateToken');


// @desc Register user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });

    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};


// @desc Login user
exports.loginUser = async (req, res) => {
    
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({
            message:'user not found.please register first'
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
