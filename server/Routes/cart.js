const express = require('express');
const router = express.Router();
const user = require('../Modules/userModal');

// Post route
router.post("/", async (req, res) => {
    const { cart } = req.body;
    const { email } = req.user;
    cart._id = (new Date().getTime()).toString();

    try {
        const userWithCart = await user.findOne({ email: email });

        if (!userWithCart) {
            return res.status(400).json({ "error": [{ "msg": "Email Not Found", }] });
        } else {
            userWithCart.cart.push(cart);
            await userWithCart.save();
            return res.status(200).json({ "message": "Item added to the cart successfully", "user": userWithCart });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ "error": [{ "msg": "Internal server error.", }] });
    }
});

router.get("/all", async (req, res) => {
    const { cart } = req.user;
    try {
        res.status(200).json({ cart: cart })
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ "error": [{ "msg": "Internal server error.", }] });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { user_Id } = req.user;
    const { id } = req.params;

    try {
        const userWithCart = await user.findOneAndUpdate(
            { _id: user_Id },
            {
                $pull: { cart: { _id: id } }
            },
            { new: true }
        );
        if (!userWithCart) {
            return res.status(400).json({ "error": [{ "msg": "Item not found.", }] });
        } else {
            return res.status(200).json({ "Message": [{ "msg": "Item deleted successfully.", }] });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ "error": [{ "msg": "Internal server error.", }] });
    }
});

router.delete("/delete", async (req, res) => {
    const { email } = req.user;

    try {
        const userWithCartlist = await user.findOne({ email: email });

        if (!userWithCartlist) {
            return res.status(400).json({
                "error": [{ "msg": "Email Not Found", }]
            });
        } else {
            await userWithCartlist.updateOne({ cart: [] });
            return res.status(200).json({ "message": "Cart removed successfully", });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({ "error": [{ "msg": "Internal server error.", }] });
    }
});

module.exports = router;
