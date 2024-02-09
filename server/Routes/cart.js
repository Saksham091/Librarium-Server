const express = require('express');
const router = express.Router();
const user = require('../Modules/userModal');

// Post route
router.post("/", async (req, res) => {
    const { email, cart } = req.body;

    try {
        const userWithCart = await user.findOne({ email: email });

        if (!userWithCart) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            userWithCart.cart.push(cart);
            await userWithCart.save();
            return res.status(200).json({
                "message": "Item added to the cart successfully",
                "user": userWithCart
            });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            "error": [
                {
                    "msg": "Internal server error.",
                }
            ]
        });
    }
});

router.get("/all", async (req, res) => {

    const { email } = req.query;

    try {
        const userWithCart = await user.findOne({ email: email });

        if (!userWithCart) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            const result = userWithCart.cart
            res.status(200).json({cart:result})
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            "error": [
                {
                    "msg": "Internal server error.",
                }
            ]
        });
    }
});

router.delete("/delete", async (req, res) => {
    const { email } = req.body;

    try {
        const userWithCartlist = await user.findOne({ email: email });

        if (!userWithCartlist) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            await userWithCartlist.updateOne({ $unset: { cart: 1 } });
            return res.status(200).json({
                "message": "Cart removed successfully",
            });
        }
    } catch (error) {
        console.error("An error occurred:", error);
        res.status(500).json({
            "error": [
                {
                    "msg": "Internal server error.",
                }
            ]
        });
    }
});


module.exports = router;
