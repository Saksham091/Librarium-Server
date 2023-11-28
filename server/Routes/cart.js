const express = require('express');
const router = express.Router();
const user = require('../Modules/userModal');

// Post route
router.post("/", async (req, res) => {
    const { email, wishlist } = req.body;

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
            userWithCart.wishlist.push(wishlist);
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


router.delete("/wishlist", async (req, res) => {
    const { email } = req.body;

    try {
        const userWithWishlist = await user.findOne({ email: email });

        if (!userWithWishlist) {
            return res.status(400).json({
                "error": [
                    {
                        "msg": "Email Not Found",
                    }
                ]
            });
        } else {
            await userWithWishlist.updateOne({ $unset: { wishlist: 1 } });
            return res.status(200).json({
                "message": "Wishlist removed successfully",
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
