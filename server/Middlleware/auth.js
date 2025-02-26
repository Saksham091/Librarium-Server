const jwt = require('jsonwebtoken');
const user = require('../Modules/userModal');
const JWT_SECRET = process.env.JWT_SECRET;

const middleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization is required" });
    }

    const token = authorization.split(' ')[1];
    try {
        const { userId } = jwt.verify(token, JWT_SECRET);
        const userData = await user.findById(userId);

        if (!userData) {
            return res.status(401).json({ error: "Invalid token" });
        }

        req.user = {
            user_Id: userData._id,
            email: userData.email,
            cart: userData.cart,
            wishlist: userData.wishlist
        };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = middleware;
